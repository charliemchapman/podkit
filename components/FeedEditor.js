import React from 'react';
import ReactDOM from 'react-dom'; 
import LabelInput from './LabelInput';

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

    getChannelItemForm(label, channelItem) {
        const feed = this.props.feed;
        const channel = feed.rss.channel[0];
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
            newFeed.rss.channel[0][channelItem] = { ...newFeed.rss.channel[0][channelItem] };
            newFeed.rss.channel[0][channelItem] = [newValue];
            this.props.updateFeed(newFeed);
        };
        return <LabelInput label={label} value={channel[channelItem][0]} onChange={onChange}/>
    }

    getImageUrlForm(){
        const feed = this.props.feed;
        const channel = feed.rss.channel[0];
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
            newFeed.rss.channel[0]['itunes:image'] = { ...newFeed.rss.channel[0]['itunes:image'] };
            newFeed.rss.channel[0]['itunes:image'] = [{$: {href: newValue}}];
            this.props.updateFeed(newFeed);
        };
        return (
            <LabelInput label="Image Url" value={channel['itunes:image'][0]['$'].href} onChange={onChange}/>
        )
    }

    getCategoryForm(){
        const feed = this.props.feed;
        const channel = feed.rss.channel[0];
        const onChange = (e)=>{
            const newValue = e.target.value;
            const newFeed = { ...feed, rss: { ...feed.rss, channel: [{...feed.rss.channel[0]}]} };
            newFeed.rss.channel[0]['itunes:category'] = { ...newFeed.rss.channel[0]['itunes:category'] };
            newFeed.rss.channel[0]['itunes:category'] = [{$: {href: newValue}}];
            this.props.updateFeed(newFeed);
        };
        return (
            <LabelInput label="Image Url" value={channel['itunes:category'][0]['$'].text} onChange={onChange}/>
        )
    }

    getFeedForm(feed) {
        const channel = this.props.feed.rss.channel[0];
        const isExplicit =channel['itunes:explicit'][0].match("yes|explicit|true");

        return (
            <div className="feed-settings">
                { this.getChannelItemForm('Title', 'title') }
                { this.getChannelItemForm('Link', 'link') }
                { this.getChannelItemForm('lastBuildDate', 'lastBuildDate') }
                { this.getChannelItemForm('Language', 'language') }
                { this.getChannelItemForm('Subtitle', 'itunes:subtitle') }
                { this.getChannelItemForm('Author', 'itunes:author') }
                { this.getChannelItemForm('Summary', 'itunes:summary') }
                { this.getImageUrlForm() }
                { this.getCategoryForm() }
                <div>
                    <label>Explicit</label>
                    <input type="checkbox" checked={isExplicit}/>
                </div>
            </div>
        );
    }
}

export default FeedEditor;