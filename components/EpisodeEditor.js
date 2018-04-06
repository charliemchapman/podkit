import React from 'react';
import ReactDOM from 'react-dom';

function getEpisodeForm() {
    return (
        <div className="feed-settings">
            <div>
                <label>Title</label>
                <input/>
            </div>
            <div>
                <label>Link</label>
                <input/>
            </div>
            <div>
                <label>Language</label>
                <input/>
            </div>
            <div>
                <label>Copyright</label>
                <input/>
            </div>
            <div>
                <label>Subtitle</label>
                <input/>
            </div>
            <div>
                <label>Author</label>
                <input/>
            </div>
            <div>
                <label>Summary</label>
                <input/>
            </div>
            <div>
                <label>Owner Name</label>
                <input/>
            </div>
            <div>
                <label>Owner Email</label>
                <input/>
            </div>
            <div>
                <label>Image Url</label>
                <input/>
            </div>
            <div>
                <label>Category</label>
                <input/>
            </div>
        </div>
    );
}

class EpisodeEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { isOpen } = this.state;
        const toggle = ()=>this.setState({isOpen: !isOpen});
        const arrowClass = isOpen ? 'arrow-down' : 'arrow-right';

        let feedSection;
        if (isOpen){
            feedSection = getEpisodeForm();
        }

        return (
            <section>
                <div className="section-header" onClick={toggle}>
                    <div className={arrowClass}/>
                    <span>Episode Title</span>
                </div>
                { feedSection }
            </section>
        );
    }
}

export default EpisodeEditor;