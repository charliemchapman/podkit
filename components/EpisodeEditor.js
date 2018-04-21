import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { episodeJsonToXmlFeed } from '../helpers/jsonEpisodeHelper';

const xml2js = require('xml2js');

class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
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

    getDescriptionForm(){
        const { episodeJson, updateEpisode } = this.props;
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...episodeJson}
            newEpisode['description'] =  [newValue];
            updateEpisode(newEpisode);
        };
        const value = episodeJson['description'];

        return (
            <div className="label-textarea">
                <Typography variant="body1">Description</Typography>
                <textarea value={value} onChange={onChange} className="episode-editor__xml"/>
            </div>
        )
    }

    getEpisodeForm() {
        return (
            <div className="feed-settings">
                <section className="simple-fields">
                    {this.getChannelItemForm('Title', 'title')}
                    {this.getChannelItemForm('dc:creator', 'dc:creator')}
                    {this.getChannelItemForm('pubDate', 'pubDate')}
                    {this.getChannelItemForm('link', 'link')}
                    {this.getChannelItemForm('Guid', 'guid')}
                    {this.getChannelItemForm('itunes:author', 'author')}
                    {this.getChannelItemForm('itunes:subtitle', 'subtitle')}
                    {this.getChannelItemForm('itunes:explicit', 'explicit')}
                    {this.getChannelItemForm('itunes:duration', 'duration')}
                    <LabelInput label="itunes:image"/>
                    {this.getChannelItemForm('content:encoded', 'encoded')}
                    <LabelInput label="enclosure"/>
                    <LabelInput label="media:content"/>
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
        var xmlString = builder.buildObject(xml);

        return (
            <TextField
                multiline
                value={xmlString}
                className="episode-editor__xml"
            />
        )
    }

    render() {
        const { episodeJson, deleteEpisode } = this.props;

        return (
            <div>
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