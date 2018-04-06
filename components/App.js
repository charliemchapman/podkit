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
        }
        this.openFile = this.openFile.bind(this);
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
                    setFeed(data, result);
                });
            });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="app">
                <div className="title-bar"/>
                <header>
                    <button onClick={this.openFile}>Open</button>
                    <button>New</button>
                </header>
                <Editor xmlString={this.state.xmlString} feed={this.state.feed}/>
                <footer>
                    <button>Save</button>
                    <button>Save As</button>
                </footer>
            </div>
        );
    }
}

export default App;