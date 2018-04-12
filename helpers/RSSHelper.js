export default class RSSHelper {
    constructor(feed){
        this.feed = feed;
    }

    getAttributeValue(attrName){
        return this.feed.rss.channel[0][attrName]
    }

    updateAttributeValue(attrName, newValue){
        const newFeed = { ...this.feed, rss: { ...this.feed.rss, channel: [{...this.feed.rss.channel[0]}]} };
        newFeed.rss.channel[0][attrName] = { ...newFeed.rss.channel[0][attrName] };
        newFeed.rss.channel[0][attrName] = [newValue];

        return newFeed;
    }

    getImageUrlValue(){
        return this.feed.rss.channel[0]['itunes:image'][0]['$'].href
    }

    updateImageUrlValue(newValue){
        const newFeed = { ...this.feed, rss: { ...this.feed.rss, channel: [{...this.feed.rss.channel[0]}]} };
        newFeed.rss.channel[0]['itunes:image'] = { ...newFeed.rss.channel[0]['itunes:image'] };
        newFeed.rss.channel[0]['itunes:image'] = [{$: {href: newValue}}];

        return newFeed;
    }

    getCategoryValue(){
        return this.feed.rss.channel[0]['itunes:category'][0]['$'].text
    }

    updateCategoryValue(newValue){
        const newFeed = { ...this.feed, rss: { ...this.feed.rss, channel: [{...this.feed.rss.channel[0]}]} };
        newFeed.rss.channel[0]['itunes:category'] = { ...newFeed.rss.channel[0]['itunes:category'] };
        newFeed.rss.channel[0]['itunes:category'] = [{$: {text: newValue}}];

        return newFeed;
    }

    addNewEpisode() {
        const newEpisode = {
            'title': ['New Episode'],
            'dc:creator': [''],
            'pubDate': [''],
            'link': [''],
            'guid': [{           
                    isPermaLink: ''
                }],
            'description': [''], /*CDATA*/
            'itunes:author': [''],
            'itunes:subtitle': [''],
            'itunes:explicit': ['no'],
            'itunes:duration': [''],
            'itunes:image': [{           
                href: ''
            }],
            'content:encoded': [''], /*CDATA*/
            'enclosure': [{           
                isDefault: '',
                length: '',
                medium: '',
                type: '',
                url: ''
            }],
            'media:content':[{           
                isDefault: '',
                length: '',
                medium: '',
                type: '',
                url: ''
            }],

        }        

        const newFeed = { ...this.feed, rss: { ...this.feed.rss, channel: [{...this.feed.rss.channel[0]}]} };
        const newItem = [newEpisode, ...newFeed.rss.channel[0].item];
        newFeed.rss.channel[0].item = newItem;
        
        return newFeed;
    }
}