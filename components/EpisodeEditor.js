import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';

class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    getChannelItemForm(label, channelItem) {
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...this.props.episodeXml}
            newEpisode[channelItem] =  [newValue];
            this.props.updateEpisode(newEpisode);
        };
        const value = this.props.episodeXml[channelItem] ? this.props.episodeXml[channelItem][0] : "";
        return <LabelInput label={label} value={value} onChange={onChange}/>
    }

    getGuidForm(label, channelItem) {
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...this.props.episodeXml}
            newEpisode[channelItem] =  [newValue];
            this.props.updateEpisode(newEpisode);
        };
        const valueObject = this.props.episodeXml[channelItem];
        const value = valueObject 
                        ? valueObject._ 
                            ? valueObject._.trim() 
                            : valueObject[0] 
                                ? valueObject[0]._
                                    ?  valueObject[0]._.trim()
                                    : valueObject[0].trim()
                                : valueObject.trim() 
                        : "";
        return <LabelInput label={label} value={value} onChange={onChange}/>
    }

    getDescriptionForm(){
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newEpisode = {...this.props.episodeXml}
            newEpisode['description'] =  [newValue];
            this.props.updateEpisode(newEpisode);
        };
        const value = this.props.episodeXml['description'] ? this.props.episodeXml['description'][0] : "";

        return (
            <div className="label-textarea">
                <Typography variant="body1">Description</Typography>
                <textarea value={value} onChange={onChange}/>
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
                    {this.getGuidForm('guid', 'guid')}
                    {this.getChannelItemForm('itunes:author', 'itunes:author')}
                    {this.getChannelItemForm('itunes:subtitle', 'itunes:subtitle')}
                    {this.getChannelItemForm('itunes:explicit', 'itunes:explicit')}
                    {this.getChannelItemForm('itunes:duration', 'itunes:duration')}
                    <LabelInput label="itunes:image"/>
                    {this.getChannelItemForm('content:encoded', 'content:encoded')}
                    <LabelInput label="enclosure"/>
                    <LabelInput label="media:content"/>
                </section>
                <section>
                    { this.getDescriptionForm() }
                </section>
            </div>
        );
    }

    render() {
        const title = this.props.episodeXml.title[0];

        return (
            <div className="editor">
                <Typography variant="headline">{title}</Typography>
                { this.getEpisodeForm() }
            </div>
        );
    }
}

export default EpisodeEditor;