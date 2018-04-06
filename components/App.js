import React from 'react';
import ReactDOM from 'react-dom';
import FeedEditor from './FeedEditor';
import EpisodeEditor from './EpisodeEditor';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="title-bar"/>
                <header>
                    <button>Open</button>
                    <button>New</button>
                </header>
                <main>
                    <FeedEditor/>
                    <EpisodeEditor/>
                </main>
                <footer>
                    <button>Save</button>
                    <button>Save As</button>
                </footer>
            </div>
        );
    }
}

export default App;