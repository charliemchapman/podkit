import React from 'react';
import ReactDOM from 'react-dom';
import LabelInput from './LabelInput';

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
        return <LabelInput label={label} value={this.props.episodeXml[channelItem][0]} onChange={onChange}/>
    }

    getEpisodeForm() {
        return (
            <div className="feed-settings">
                {this.getChannelItemForm('Title', 'title')}
                {this.getChannelItemForm('dc:creator', 'dc:creator')}
                {this.getChannelItemForm('pubDate', 'pubDate')}
                {this.getChannelItemForm('link', 'link')}
                {this.getChannelItemForm('guid', 'guid')}
                {this.getChannelItemForm('description', 'description')}
                {this.getChannelItemForm('itunes:author', 'itunes:author')}
                {this.getChannelItemForm('itunes:subtitle', 'itunes:subtitle')}
                {this.getChannelItemForm('itunes:explicit', 'itunes:explicit')}
                {this.getChannelItemForm('itunes:duration', 'itunes:duration')}
                <LabelInput label="itunes:image"/>
                {this.getChannelItemForm('content:encoded', 'content:encoded')}
                <LabelInput label="enclosure"/>
                <LabelInput label="media:content"/>
            </div>
        );
    }

    render() {
        const title = this.props.episodeXml.title[0];

        return (
            <div className="editor">
                <h2>{title}</h2>
                { this.getEpisodeForm() }
            </div>
        );
    }
}

export default EpisodeEditor;