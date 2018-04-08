import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';

const { dialog } = require('electron').remote;
const fs = require("fs");
const xml2js = require('xml2js');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xmlString: null,
            feed: null
        }

        this.openFile = this.openFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.updateFeed = this.updateFeed.bind(this);
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

    render() {
        const saveDisabled = !this.state.feed;

        return (
            <div className="app">
                <div className="title-bar"/>
                <header>
                    <button onClick={this.openFile}>Open</button>
                </header>
                <Editor xmlString={this.state.xmlString} feed={this.state.feed} updateFeed={this.updateFeed}/>
                <footer>
                    <button onClick={this.saveAs} disabled={saveDisabled}>Save As</button>
                </footer>
            </div>
        );
    }
}

export default App;