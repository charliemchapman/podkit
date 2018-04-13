import React from 'react';
import ReactDOM from 'react-dom'; 
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import RSSHelper from '../helpers/RSSHelper';

class FeedEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.getFeedForm = this.getFeedForm.bind(this);
    }

    render() {
        return (
            <div className="editor">
                <Typography variant="headline">Feed Settings</Typography>
                { this.getFeedForm(this.props.feed) }
            </div>
        );
    }

    shared(label, getter, setter){
        const rssHelper = new RSSHelper(this.props.feed);
        const value = getter();
        const onChange = (e) => {
            const newFeed = setter(e.target.value);
            this.props.updateFeed(newFeed);
        }
        return <LabelInput label={label} value={value} onChange={onChange}/>;
    }

    getChannelItemForm(label, channelItem) {
        const rssHelper = new RSSHelper(this.props.feed);
        return this.shared(label, ()=>rssHelper.getAttributeValue(channelItem), (v)=>rssHelper.updateAttributeValue(channelItem, v));
    }

    getImageUrlForm(){
        const rssHelper = new RSSHelper(this.props.feed);
        return this.shared('Image Url', ()=>rssHelper.getImageUrlValue(), (v)=>rssHelper.updateImageUrlValue(v));
    }

    getCategoryForm(){
        const rssHelper = new RSSHelper(this.props.feed);
        return this.shared('Category', ()=>rssHelper.getCategoryValue(), (v)=>rssHelper.updateCategoryValue(v));
    }

    getExplicitForm(){
        const channel = this.props.feed.rss.channel[0];
        const isExplicit = channel['itunes:explicit'] ? channel['itunes:explicit'][0].match("yes|explicit|true") : false;

        return (
            <div>
                <label><Typography variant="body1">Explicit</Typography></label>
                <input type="checkbox" checked={isExplicit}/>
            </div>
        );
    }

    getFeedForm(feed) {
        return (
            <div className="feed-settings">
                <section className="simple-fields">
                    { this.getChannelItemForm('Title', 'title') }
                    { this.getChannelItemForm('Link', 'link') }
                    { this.getChannelItemForm('lastBuildDate', 'lastBuildDate') }
                    { this.getChannelItemForm('Language', 'language') }
                    { this.getChannelItemForm('Subtitle', 'itunes:subtitle') }
                    { this.getChannelItemForm('Author', 'itunes:author') }
                    { this.getChannelItemForm('Summary', 'itunes:summary') }
                    { this.getImageUrlForm() }
                    { this.getCategoryForm() }
                    { this.getExplicitForm() }
                </section>
            </div>
        );
    }
}

export default FeedEditor;