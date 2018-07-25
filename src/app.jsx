import React from 'react';
import Root from './components/App';

const { dialog } = require('electron').remote;
const fs = require("fs");

export default class App extends React.Component {
    openFile(openNewFile){
      dialog.showOpenDialog((filePaths) => {
          if(filePaths === undefined || filePaths.length < 1){
              return;
          }

          fs.readFile(filePaths[0], 'utf-8', (err, data) => {
              if(err){
                  alert("An error ocurred reading the file :" + err.message);
                  return;
              }

              openNewFile(data);
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

  render() {
    return <Root saveFile={this.saveFile} openFile={this.openFile} isElectron={true}/>;
  }
}
