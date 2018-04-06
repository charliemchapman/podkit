import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';

const { dialog } = require('electron').remote;
const fs = require("fs");

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
            console.log(filePaths)
            if(filePaths === undefined || filePaths.length < 1){
                console.log("No file selected");
                return;
            }

            fs.readFile(filePaths[0], 'utf-8', (err, data) => {
                if(err){
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                this.setState({ xmlString: data});
            });
        });
    }

    render() {
        return (
            <div className="app">
                <div className="title-bar"/>
                <header>
                    <button onClick={this.openFile}>Open</button>
                    <button>New</button>
                </header>
                <Editor xmlString={this.state.xmlString}/>
                <footer>
                    <button>Save</button>
                    <button>Save As</button>
                </footer>
            </div>
        );
    }
}

export default App;