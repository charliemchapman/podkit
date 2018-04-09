import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        if (!this.props.xmlString){
            return <div className="editor">OPEN FILE TO EDIT</div>;
        }

        if (this.props.selectedEpisodeIndex === -1){
            return <FeedEditor feed={this.props.feed} updateFeed={this.props.updateFeed}/>
        }

        var episode = this.props.feed.rss.channel[0].item[this.props.selectedEpisodeIndex];
        const updateEpisode = (updatedEpisode)=>{
            const feed = this.props.feed;
            const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
            newFeed.rss.channel[0].episode[i] = updatedEpisode;
            this.props.updateFeed(newFeed);
        };

        return <EpisodeEditor episodeXml={episode} feed={this.props.feed} updateEpisode={updateEpisode}/>
    }
}

export default Editor;