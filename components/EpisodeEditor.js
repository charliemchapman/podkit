import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'material-ui/Button';
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

    getEpisodeImageForm(){
        const { episodeJson, updateEpisode } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode.image =  newValue;
            updateEpisode(newEpisode);
        };
        const value = episodeJson.image;
        
        return (
            <div className="episode-image">
                <div className="episode-image__img">
                    <img src={value} alt={'episode image'}/>
                </div>
                <LabelInput label={'image'} value={value} onChange={onChange}/>
            </div>
        )
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
                <section className="simple-fields">
                    { this.getEpisodeImageForm() }
                    {this.getChannelItemForm('Title', 'title')}
                    {this.getChannelItemForm('pubDate', 'pubDate')}
                    {this.getChannelItemForm('Guid', 'guid')}
                    {this.getChannelItemForm('link', 'link')}
                    {this.getChannelItemForm('itunes:duration', 'duration')}
                    {this.getChannelItemForm('itunes:explicit', 'explicit')}
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