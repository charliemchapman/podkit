import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        const { jsonFeed, updateJsonFeed, selectedEpisodeIndex } = this.props;

        if (selectedEpisodeIndex === -1){
            return <FeedEditor jsonFeed={jsonFeed} updateJsonFeed={updateJsonFeed}/>
        }

        var episodeJson = jsonFeed.episodes[selectedEpisodeIndex];
        const updateEpisode = (updatedEpisode) => {
            const newJsonFeed = { ...jsonFeed, episodes: [...jsonFeed.episodes]};
            newJsonFeed.episodes[selectedEpisodeIndex] = updatedEpisode;
            updateJsonFeed(newJsonFeed);
        };

        return <EpisodeEditor episodeJson={episodeJson} jsonFeed={jsonFeed} updateEpisode={updateEpisode} />
    }
}

export default Editor;