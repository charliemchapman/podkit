import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        const { selectedEpisodeIndex, onSelectionChanged} = this.props;

        let feedSettingsButton;
        let episodeButtons;

        if (this.props.feed){
            const onFeedSettingsClick = ()=> onSelectionChanged(-1);
            const selectedClass = selectedEpisodeIndex === -1 ? 'sidebar__episode--selected' : '';
            feedSettingsButton = <div className={`sidebar__episode ${selectedClass}`} onClick={onFeedSettingsClick}>Feed Settings</div>

            const items = this.props.feed.rss.channel[0].item;
            episodeButtons = items.map((item, index)=>{
                const onEpisodeClick = ()=> onSelectionChanged(index);
                const selectedClass = selectedEpisodeIndex === index ? 'sidebar__episode--selected' : '';
                return <div className={`sidebar__episode ${selectedClass}`} onClick={onEpisodeClick}>{item.title[0]}</div>
            });
        }

        return (
            <div className="sidebar">
                <section>
                    <button onClick={this.props.openFile}>Open</button>
                </section>
                <section>
                    { feedSettingsButton }
                    { episodeButtons }
                </section>
            </div>
        );
    }
}

export default Editor;