import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import Sidebar from './Sidebar';
import OpenFeed from './OpenFeed';
import Button from 'material-ui/Button';
import { newFeed } from '../helpers/RSSHelper';
import RSSHelper from '../helpers/RSSHelper';
import { createJsonFeed, jsonToXmlFeed, addEpisode } from '../helpers/jsonFeedHelper';

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
        this.newFile = this.newFile.bind(this);
        this.onClose = this.onClose.bind(this);
        this.updateFeed = this.updateFeed.bind(this);
        this.updateJsonFeed = this.updateJsonFeed.bind(this);
        this.onEpisodeSelectionChange = this.onEpisodeSelectionChange.bind(this);
        this.addNewEpisode = this.addNewEpisode.bind(this);
    }

    updateFeed(updatedFile) {
        const jsonFeed = createJsonFeed(updatedFile);
        this.setState({ feed: updatedFile, jsonFeed });
    }

    updateJsonFeed(updatedJsonFeed){
        const xmlFeed = jsonToXmlFeed(updatedJsonFeed);
        this.setState({ feed: xmlFeed, jsonFeed: updatedJsonFeed });
    }

    newFile(){
        const newXml = newFeed();
        this.setState({ feed: newXml, jsonFeed: createJsonFeed(newXml) });
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

                const setFeed = (xmlString, feed) => this.setState({ xmlString, feed, jsonFeed: createJsonFeed(feed)});
                parser.parseString(data, function (err, result) {
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
        const { jsonFeed } = this.state;
        const xmlFeed = jsonToXmlFeed(jsonFeed);
        var builder = new xml2js.Builder();
        var xmlString = builder.buildObject(xmlFeed);

        this.saveFile(xmlString);
    }

    onClose() {
        this.setState({xmlString: null, feed: null, jsonFeed: null, selectedEpisodeIndex: -1});
    }

    onEpisodeSelectionChange(episodeIndex){
        this.setState({selectedEpisodeIndex: episodeIndex});
    }

    addNewEpisode() {
        var newFeed = addEpisode(this.state.jsonFeed);
        this.updateJsonFeed(newFeed);
        this.onEpisodeSelectionChange(0);
    }

    render() {
        if (!this.state.jsonFeed){
            return <OpenFeed openFile={this.openFile} newFile={this.newFile}/>
        }

        const isDirty = !!this.state.jsonFeed;

        return (
            <div className="app">
                <Sidebar
                    jsonFeed={ this.state.jsonFeed }
                    openFile={ this.openFile }
                    selectedEpisodeIndex={ this.state.selectedEpisodeIndex } 
                    onSelectionChanged={ this.onEpisodeSelectionChange }
                    isDirty={ isDirty }
                    saveAs={ this.saveAs }
                    onClose={ this.onClose }
                    addNewEpisode={this.addNewEpisode} />
                <main>
                    <Editor
                        jsonFeed={this.state.jsonFeed}
                        updateJsonFeed={this.updateJsonFeed}
                        selectedEpisodeIndex={this.state.selectedEpisodeIndex}/>
                </main>
            </div>
        );
    }
}

export default App;