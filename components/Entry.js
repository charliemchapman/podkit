import React from 'react';
import ReactDOM from 'react-dom';

class Entry extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="title-bar"/>
                <header>
                    <button>Open</button>
                    <button>New</button>
                </header>
                <main>
                    <section>
                        <label>Feed Settings</label>
                        <div className="feed-settings">
                            <label>Title</label>
                            <input/>
                        </div>
                    </section>
                    <section>
                        <label>Episodes</label>
                        <div className="episodes"></div>
                    </section>
                </main>
                <footer>
                    <button>Save</button>
                    <button>Save As</button>
                </footer>
            </div>
        );
    }
}

export default Entry;