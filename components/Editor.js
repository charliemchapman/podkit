import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        if (!this.props.xmlString){
            return <main>OPEN FILE TO EDIT</main>;
        }

        const items = this.props.feed.rss.channel[0].item;
        const episodes = items.map((item, i)=>{
            const updateEpisode = (updatedEpisode)=>{
                const feed = this.props.feed;
                const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
                newFeed.rss.channel[0].item[i] = updatedEpisode;
                this.props.updateFeed(newFeed);
            };

            return <EpisodeEditor episodeXml={item} feed={this.props.feed} updateEpisode={updateEpisode}/>
        })

        const title = this.props.feed.rss.channel[0].title[0]

        return (
            <main>
                <h2>{title}</h2>
                <FeedEditor feed={this.props.feed} updateFeed={this.props.updateFeed}/>
                <h2>Episodes</h2>
                {episodes}
            </main>
        );
    }
}

export default Editor;