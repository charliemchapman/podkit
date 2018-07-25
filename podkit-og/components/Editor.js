import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';
import Card, {CardContent} from 'material-ui/Card';

class Editor extends React.Component {
    render() {
        const { jsonFeed, updateJsonFeed, selectedEpisodeIndex, deleteEpisode } = this.props;

        if (selectedEpisodeIndex === -1){
            return (
                <div className="editor-card">
                    <Card><CardContent>
                        <FeedEditor jsonFeed={jsonFeed} updateJsonFeed={updateJsonFeed}/>
                    </CardContent></Card>
                </div>);
        }

        var episodeJson = jsonFeed.episodes[selectedEpisodeIndex];
        const updateEpisode = (updatedEpisode) => {
            const newJsonFeed = { ...jsonFeed, episodes: [...jsonFeed.episodes]};
            newJsonFeed.episodes[selectedEpisodeIndex] = updatedEpisode;
            updateJsonFeed(newJsonFeed);
        };

        const removeEpisode = ()=>{
            deleteEpisode(selectedEpisodeIndex);
        }

        return (
            <div className="editor-card">
                <Card><CardContent>
                    <EpisodeEditor episodeJson={episodeJson} jsonFeed={jsonFeed} updateEpisode={updateEpisode} deleteEpisode={removeEpisode} />
                </CardContent></Card>
            </div>
        );
    }
}

export default Editor;