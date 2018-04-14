import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        if (this.props.selectedEpisodeIndex === -1){
            return <FeedEditor jsonFeed={this.props.jsonFeed} updateJsonFeed={this.props.updateJsonFeed}/>
        }

        var episode = this.props.feed.rss.channel[0].item[this.props.selectedEpisodeIndex];
        const updateEpisode = (updatedEpisode, i) => {
            const feed = this.props.feed;
            const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
            newFeed.rss.channel[0].item = [ ...newFeed.rss.channel[0].item ];
            newFeed.rss.channel[0].item[this.props.selectedEpisodeIndex] = updatedEpisode;
            this.props.updateFeed(newFeed);
        };

        return <EpisodeEditor episodeXml={episode} feed={this.props.feed} updateEpisode={updateEpisode}/>
    }
}

export default Editor;