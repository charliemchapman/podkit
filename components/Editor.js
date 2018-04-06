import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeEditor from './EpisodeEditor';
import FeedEditor from './FeedEditor';

class Editor extends React.Component {
    render() {
        if (!this.props.xmlString){
            return <main>OPEN FILE TO EDIT</main>;
        }
        return (
            <main>
                <FeedEditor feed={this.props.feed}/>
                <EpisodeEditor/>
                <h3>Raw XML</h3>
                <div>{this.props.xmlString}</div>
            </main>
        );
    }
}

export default Editor;