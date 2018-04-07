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
            return <EpisodeEditor episodeXml={item}/>
        })

        return (
            <main>
                <FeedEditor feed={this.props.feed} updateFeed={this.props.updateFeed}/>
                {episodes}
                <h3>Raw XML</h3>
                <div>{this.props.xmlString}</div>
            </main>
        );
    }
}

export default Editor;