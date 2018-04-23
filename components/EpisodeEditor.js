import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { episodeJsonToXmlFeed } from '../helpers/jsonEpisodeHelper';
import HtmlEditor from './HtmlEditor';

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

    getTextAreaForm(label, channelItem) {
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode[channelItem] =  newValue;
            updateEpisode(newEpisode);
        };
        let value = episodeJson[channelItem];
        value = value ? value.trim() : value;
        return (
            <div>
                <span>{label}</span>
                <textarea
                    label={label}
                    value={value}
                    onChange={onChange}
                    className="episode-editor__textarea"
                />
            </div>);
    }

    // getDescriptionForm(){
    //     const { episodeJson, updateEpisode } = this.props;
    //     const onChange = (newValue)=>{
    //         const newEpisode = {...episodeJson}
    //         newEpisode['description'] =  newValue;
    //         updateEpisode(newEpisode);
    //     };
    //     const value = episodeJson['description'];

    //     return (
    //         <div className="label-textarea">
    //             <Typography variant="body1">Description</Typography>
    //             <HtmlEditor value={value} onChange={onChange}/>
    //         </div>
    //     )
    // }

    getDescriptionEditor(){
        const { episodeJson, updateEpisode } = this.props;
        const onClose = (newValue)=>{
            console.log(newValue);
            const newEpisode = {...episodeJson}
            newEpisode['description'] =  newValue;
            updateEpisode(newEpisode);
            this.setState({isDescriptionEditorOpen: false});
        };
        const value = episodeJson['description'];
    
        return (
            <div className="pop-up">
                <div className="pop-up__content">
                    <HtmlEditor value={value} onSave={onClose} />
                </div>
            </div>
        )
    }

    getDescriptionForm(){
        const openDescriptionEditor = ()=> this.setState({isDescriptionEditorOpen: true});

        return (
            <div className="label-textarea">
                <Typography variant="body1">Description</Typography>
                <button onClick={openDescriptionEditor}>EDIT DESCRIPTION</button>
            </div>
        )
    }

    getEpisodeForm() {
        return (
            <div className="feed-settings">
                <section className="simple-fields">
                    {this.getChannelItemForm('Title', 'title')}
                    {this.getChannelItemForm('pubDate', 'pubDate')}
                    {this.getChannelItemForm('Guid', 'guid')}
                    {this.getChannelItemForm('link', 'link')}
                    {this.getChannelItemForm('itunes:duration', 'duration')}
                    {this.getChannelItemForm('itunes:explicit', 'explicit')}
                    {this.getChannelItemForm('itunes:episodeType', 'episodeType')}
                    {this.getTextAreaForm('itunes:subtitle', 'subtitle')}
                    {this.getTextAreaForm('content:encoded', 'contentEncoded')}
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
        var builder = new xml2js.Builder();
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