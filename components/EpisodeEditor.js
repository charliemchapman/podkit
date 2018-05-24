import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';
import DeleteIcon from '@material-ui/icons/Delete';
import { episodeJsonToXmlFeed } from '../helpers/jsonEpisodeHelper';
import HtmlEditor from './HtmlEditor';
import YesNoPicker from './YesNoPicker';
import { Select, MenuItem, Typography, TextField, Button, IconButton } from 'material-ui';

const xml2js = require('xml2js');

class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDescriptionEditorOpen: false
        }
    }

    getChannelItemForm(label, channelItem) {
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode[channelItem] =  newValue;
            updateEpisode(newEpisode);
        };
        const value = episodeJson[channelItem];
        return <LabelInput label={label} value={value} onChange={onChange}/>
    }

    getEnclosureAttributeForm(label, enclosureAttribute){
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson, enclosure: {...episodeJson.enclosure}}
            newEpisode.enclosure[enclosureAttribute] =  newValue;
            updateEpisode(newEpisode);
        };
        const value = episodeJson.enclosure[enclosureAttribute];
        return <LabelInput label={label} value={value} onChange={onChange}/>
    }

    getEnclosureTypeForm(){
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson, enclosure: {...episodeJson.enclosure}}
            newEpisode.enclosure.type =  newValue;
            updateEpisode(newEpisode);
        };
        const selected = episodeJson.enclosure.type ? episodeJson.enclosure.type.toLowerCase() : 'audio/mpeg';
        
        return (
            <div className="select-input">
                <Typography variant="caption">Audio File Type</Typography>
                <Select
                    value={selected}
                    onChange={onChange}>
                    <MenuItem value="audio/x-m4a">audio/x-m4a</MenuItem>
                    <MenuItem value="audio/mpeg">audio/mpeg</MenuItem>
                    <MenuItem value="video/quicktime">video/quicktime</MenuItem>
                    <MenuItem value="video/mp4">video/mp4</MenuItem>
                    <MenuItem value="video/x-m4v">video/x-m4v</MenuItem>
                    <MenuItem value="application/pdf">application/pdf</MenuItem>
                </Select>
            </div>);
    }

    getExplicitForm() {
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode.explicit =  newValue;
            updateEpisode(newEpisode);
        };
        return <YesNoPicker label={'itunes:explicit'} value={episodeJson.explicit} onChange={onChange}/>
    }

    getTextAreaForm(label, channelItem) {
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode[channelItem] =  newValue;
            updateEpisode(newEpisode);
        };
        let value = episodeJson[channelItem];
        return <LabelInput label={label} value={value} onChange={onChange} multiline={true}/>
    }

    getImageDisplay(){
        const episodeFeed = this.props.episodeJson;
        const imageUrl = episodeFeed.image;

        return (
            <div className="episode-image__img">
                <img src={imageUrl} alt="Episode Image"/>
            </div>
        );
    }

    getDescriptionEditor(){
        const { episodeJson, updateEpisode } = this.props;
        const onSave = (newValue)=>{
            const newEpisode = {...episodeJson}
            newEpisode['description'] =  newValue;
            updateEpisode(newEpisode);
            this.setState({isDescriptionEditorOpen: false});
        };
        const onClose = ()=>this.setState({isDescriptionEditorOpen:false});
        const value = episodeJson['description'];
    
        return (
            <div className="pop-up">
                <div className="pop-up__content">
                    <HtmlEditor value={value} onSave={onSave} onClose={onClose} />
                </div>
            </div>
        )
    }

    getDescriptionForm(){
        const openDescriptionEditor = ()=> this.setState({isDescriptionEditorOpen: true});

        return <Button onClick={openDescriptionEditor} variant="raised" color="secondary">DESCRIPTION EDITOR</Button>;
    }

    getEpisodeForm() {
        return (
            <div className="feed-settings">
                <section className="feed-image">
                    { this.getImageDisplay() }
                </section>
                <section className="simple-fields">
                    {this.getChannelItemForm('Title', 'title')}
                    {this.getEnclosureAttributeForm('Audio Url', 'url')}
                    {this.getEnclosureAttributeForm('Audio Length', 'length')}
                    {this.getChannelItemForm('Image', 'image')}
                    {this.getEnclosureTypeForm()}
                    {this.getChannelItemForm('pubDate', 'pubDate')}
                    {this.getChannelItemForm('Guid', 'guid')}
                    {this.getChannelItemForm('link', 'link')}
                    {this.getChannelItemForm('itunes:duration', 'duration')}
                    {this.getExplicitForm()}
                    {this.getChannelItemForm('itunes:episodeType', 'episodeType')}
                    {this.getTextAreaForm('itunes:subtitle', 'subtitle')}
                    {this.getTextAreaForm('description', 'description')}
                </section>
                <section>
                    { this.getDescriptionForm() }
                </section>
            </div>
        );
    }

    getEpisodeXml() {
        const { episodeJson } = this.props;

        const xml = episodeJsonToXmlFeed(episodeJson);
        var builder = new xml2js.Builder({cdata:true});
        let xmlString;
        try {
            xmlString = builder.buildObject(xml);
        }
        catch(err){
            xmlString = 'error... but really... who cares this is for debugging anyway'
        }

        return (
            <textarea
                value={xmlString}
                className="episode-editor__xml"
            />
        )
    }

    render() {
        const { episodeJson, deleteEpisode } = this.props;
        const { isDescriptionEditorOpen } = this.state;

        let descriptionEditorPopup;
        if (isDescriptionEditorOpen) 
            descriptionEditorPopup = this.getDescriptionEditor();

        return (
            <div>
                { descriptionEditorPopup }
                <div className="episode-editor__header">
                    <Typography variant="headline">{episodeJson.title}</Typography>
                    <IconButton onClick={deleteEpisode} color="inherit" aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
                { this.getEpisodeForm() }
                <Typography variant="display1">XML Preview</Typography>
                { this.getEpisodeXml() }
            </div>
        );
    }
}

export default EpisodeEditor;