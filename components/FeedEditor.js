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
        return (
            <div>
                <label>{label}</label>
                <input value={channel[channelItem][0]} onChange={onChange}/>
            </div>
        )
    }

    getItemForm(label, value) {
        return (
            <div>
                <label>{label}</label>
                <input value={value}/>
            </div>
        )
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
            <div>
                <label>Image Url</label>
                <input value={channel['itunes:image'][0]['$'].href} onChange={onChange}/>
            </div>
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
            <div>
                <label>Image Url</label>
                <input value={channel['itunes:category'][0]['$'].text} onChange={onChange}/>
            </div>
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