import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import Sidebar from './Sidebar';

const { dialog } = require('electron').remote;
const fs = require("fs");
const xml2js = require('xml2js');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xmlString: null,
            feed: null,
            selectedEpisodeIndex: -1
        }

        this.openFile = this.openFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.updateFeed = this.updateFeed.bind(this);
        this.onEpisodeSelectionChange = this.onEpisodeSelectionChange.bind(this);
        this.addNewEpisode = this.addNewEpisode.bind(this);
    }

    updateFeed(updatedFile) {
        this.setState({ feed: updatedFile });
    }

    openFile(){
        dialog.showOpenDialog((filePaths) => {
            if(filePaths === undefined || filePaths.length < 1){
                return;
            }

            var parser = new xml2js.Parser();
            fs.readFile(filePaths[0], 'utf-8', (err, data) => {
                if(err){
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                const setFeed = (xmlString, feed) => this.setState({ xmlString, feed});
                parser.parseString(data, function (err, result) {
                    console.log('Opened', result);
                    setFeed(data, result);
                });
            });
        });
    }

    saveFile(fileString) {
        dialog.showSaveDialog((fileName) => {
            if (fileName === undefined){
                console.log("You didn't save the file");
                return;
            }
        
            // fileName is a string that contains the path and filename created in the save file dialog.  
            fs.writeFile(fileName, fileString, (err) => {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                }
                            
                alert("The file has been succesfully saved");
            });
        }); 
    }

    saveAs() {
        const { feed } = this.state;
        var builder = new xml2js.Builder();
        var xmlString = builder.buildObject(feed);

        this.saveFile(xmlString);
    }

    onEpisodeSelectionChange(episodeIndex){
        this.setState({selectedEpisodeIndex: episodeIndex});
    }

    addNewEpisode() {
        const item = {
            /*'item': {*/
                'title': null,
                'dc:creator': null,
                'pubDate': null,
                'link': null,
                'guid': [{           
                        isPermaLink: null
                    }],
                'description': null, /*CDATA*/
                'itunes:author': null,
                'itunes:subtitle': null,
                'itunes:explicit': 'no',
                'itunes:duration': null,
                'itunes:image': [{           
                    href: null
                }],/*href*/
                'content:encoded': null, /*CDATA*/
                'enclosure': [{           
                    isDefault: null,
                    length: null,
                    medium: null,
                    type: null,
                    url: null
                }],
                'media:content':[{           
                    isDefault: null,
                    length: null,
                    medium: null,
                    type: null,
                    url: null
                }],
            /*}*/
        }        
        const feed = this.state.feed;
        const newItem = {...feed.rss.channel[0].item}
        const newChannel = {...feed.rss.channel, item: newItem};
        const newRss = {...feed.rss, channel: newChannel}
        const newFeed = { ...feed, rss: newRss} 
       
        newItem[0] = item;
        for(var i=0; i< Object.keys(feed.rss.channel[0].item).length; i++) {
          newItem[i+1] = feed.rss.channel[0].item[i];
        }

        newFeed.rss.channel[0].item = newItem;
        this.updateFeed(newFeed);
    }


    render() {
        const saveDisabled = !this.state.feed;

        return (
            <div className="app">
                <Sidebar 
                    feed={this.state.feed} 
                    openFile={this.openFile}
                    selectedEpisodeIndex={this.state.selectedEpisodeIndex}
                    onSelectionChanged={this.onEpisodeSelectionChange}
                    addNewEpisode={this.addNewEpisode}/>
                <main>
                    <Editor 
                        xmlString={this.state.xmlString} 
                        feed={this.state.feed} 
                        updateFeed={this.updateFeed} 
                        selectedEpisodeIndex={this.state.selectedEpisodeIndex}/>
                    <footer>
                        <button onClick={this.saveAs} disabled={saveDisabled}>Save As</button>
                    </footer>
                </main>
            </div>
        );
    }
}


const newEpisodeXml = 
    '<item>' +
        '<title></title>' +
        '<dc:creator></dc:creator>' +
        '<pubDate></pubDate>' +
        '<link></link>' +
        '<guid isPermaLink="false"></guid>' +
        '<description><![CDATA[]]></description>' +
        '<itunes:author></itunes:author>' +
        '<itunes:subtitle></itunes:subtitle>' +
        '<itunes:explicit>no</itunes:explicit>' +
        '<itunes:duration></itunes:duration>' +
        '<itunes:image href=""/>' +
        '<content:encoded><![CDATA[]]></content:encoded>' +
        '<enclosure url="" length="" type=""/>' +
        '<media:content url="" length="" type="" isDefault="" medium=""/>' +
    '</item>'


export default App;