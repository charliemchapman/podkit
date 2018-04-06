import React from 'react';
import ReactDOM from 'react-dom'; 

class FeedEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.getFeedForm = this.getFeedForm.bind(this);
    }

    render() {
        const { isOpen } = this.state;
        const toggle = ()=>this.setState({isOpen: !isOpen});
        const arrowClass = isOpen ? 'arrow-down' : 'arrow-right';

        let feedSection;
        if (isOpen){
            feedSection = this.getFeedForm(this.props.feed);
        }

        return (
            <section>
                <div className="section-header" onClick={toggle}>
                    <div className={arrowClass}/>
                    <span>Feed Settings</span>
                </div>
                { feedSection }
            </section>
        );
    }

    getFeedForm(feed) {
        const channel = feed.rss.channel[0];
        const title = channel.title[0];
        const link = channel.link[0];
        const language = channel.language[0];
        const copywright = "";
        const subtitle = channel['itunes:subtitle'][0];
        const author = channel['itunes:author'][0];
        const summary = channel['itunes:summary'][0];
        const ownerName = "";
        const ownerEmail = "";
        const imageUrl = channel['itunes:image'][0]['$'].href;
        const category = channel['itunes:category'][0]['$'].text;

        return (
            <div className="feed-settings">
                <div>
                    <label>Title</label>
                    <input value={title}/>
                </div>
                <div>
                    <label>Link</label>
                    <input value={link}/>
                </div>
                <div>
                    <label>Language</label>
                    <input value={language}/>
                </div>
                <div>
                    <label>Copywright</label>
                    <input value={copywright}/>
                </div>
                <div>
                    <label>Subtitle</label>
                    <input value={subtitle}/>
                </div>
                <div>
                    <label>Author</label>
                    <input value={author}/>
                </div>
                <div>
                    <label>Summary</label>
                    <input value={summary}/>
                </div>
                <div>
                    <label>Owner Name</label>
                    <input value={ownerName}/>
                </div>
                <div>
                    <label>Owner Email</label>
                    <input value={ownerEmail}/>
                </div>
                <div>
                    <label>Image Url</label>
                    <input value={imageUrl}/>
                </div>
                <div>
                    <label>Category</label>
                    <input value={category}/>
                </div>
            </div>
        );
    }
}

export default FeedEditor;