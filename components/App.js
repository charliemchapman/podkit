import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';
import TopBar from './TopBar';
import Editor from './Editor';
import Sidebar from './Sidebar';
import OpenFeed from './OpenFeed';
import Button from 'material-ui/Button';
import RSSHelper from '../helpers/RSSHelper';
import { createJsonFeed, jsonToXmlFeed, addEpisode, createEmptyJsonFeed } from '../helpers/jsonFeedHelper';

// const { dialog } = require('electron').remote;
// const fs = require("fs");
const xml2js = require('xml2js');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xmlString: null,
            feed: null,
            selectedEpisodeIndex: -1,
            isSidebarVisible: true
        }

        this.openFile = this.openFile.bind(this);
        this.openNewFile = this.openNewFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.newFile = this.newFile.bind(this);
        this.onClose = this.onClose.bind(this);
        this.updateFeed = this.updateFeed.bind(this);
        this.updateJsonFeed = this.updateJsonFeed.bind(this);
        this.onEpisodeSelectionChange = this.onEpisodeSelectionChange.bind(this);
        this.addNewEpisode = this.addNewEpisode.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.getSidebar = this.getSidebar.bind(this);
        this.deleteEpisode = this.deleteEpisode.bind(this);
    }

    updateFeed(updatedFile) {
        const jsonFeed = createJsonFeed(updatedFile);
        this.setState({ feed: updatedFile, jsonFeed });
    }

    updateJsonFeed(updatedJsonFeed){
        const xmlFeed = jsonToXmlFeed(updatedJsonFeed);
        this.setState({ feed: xmlFeed, jsonFeed: updatedJsonFeed });
    }

    deleteEpisode(index){
        const { jsonFeed, selectedEpisodeIndex } = this.state;
        const episodeTitle = jsonFeed.episodes[index].title;
        const confirmed = confirm(`Are you sure you want to delete "${episodeTitle}"?`)
        if (confirmed){
            const newJsonFeed = {...jsonFeed, episodes: [...jsonFeed.episodes]};
            newJsonFeed.episodes.splice(selectedEpisodeIndex, 1);
            this.setState({ jsonFeed: newJsonFeed, selectedEpisodeIndex: -1 })
        }
    }

    newFile(){
        const newJson = createEmptyJsonFeed();
        this.setState({ feed: jsonToXmlFeed(newJson), jsonFeed: newJson, isSidebarVisible: true });
    }

    openNewFile(fileString) {
        var parser = new xml2js.Parser();
        const setFeed = (xmlString, feed) => this.setState({ xmlString, feed, jsonFeed: createJsonFeed(feed), isSidebarVisible: true});
        parser.parseString(fileString, function (err, result) {
            setFeed(fileString, result);
        }); 
    }

    openFile(fileString){
        if (this.props.isElectron){
            this.props.openFile(this.openNewFile);
        }
        else{
            this.openNewFile(fileString);
        }
    }

    saveFile(fileString) {
        this.props.saveFile(fileString);
    }

    saveAs() {
        const { jsonFeed } = this.state;
        const xmlFeed = jsonToXmlFeed(jsonFeed);
        var builder = new xml2js.Builder({cdata:true});
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

    toggleSidebar() {
        this.setState({isSidebarVisible: !this.state.isSidebarVisible});
    }

    getSidebar(){
        if (!this.state.isSidebarVisible) return;

        return (
            <Sidebar
                jsonFeed={ this.state.jsonFeed }
                openFile={ this.openFile }
                selectedEpisodeIndex={ this.state.selectedEpisodeIndex } 
                onSelectionChanged={ this.onEpisodeSelectionChange }/>);
    }

    render() {
        if (!this.state.jsonFeed){
            return (
                <div>
                    <TopBar>
                        <Button color="inherit" onClick={this.newFile}>NEW</Button>
                    </TopBar>
                    <OpenFeed openFile={this.openFile} newFile={this.newFile} isElectron={this.props.isElectron}/>
                </div>
            );
        }

        const isDirty = !!this.state.jsonFeed;

        return (
            <React.Fragment>
            <CssBaseline />
            <div className="app">
                <TopBar onMenuClicked={this.toggleSidebar}>
                    <Button color="inherit" onClick={this.addNewEpisode}>ADD EPISODE</Button>
                    <Button color="inherit" onClick={this.onClose}>CLOSE</Button>
                    <Button color="inherit" onClick={this.saveAs}>SAVE</Button>
                </TopBar>
                <div className="app-body">
                    {this.getSidebar()}
                    <main>
                        <Editor
                            jsonFeed={this.state.jsonFeed}
                            updateJsonFeed={this.updateJsonFeed}
                            selectedEpisodeIndex={this.state.selectedEpisodeIndex}
                            deleteEpisode={this.deleteEpisode}/>
                    </main>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default App;