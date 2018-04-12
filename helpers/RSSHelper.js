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
        const newFeed = { ...this.feed, rss: { ...this.feed.rss, channel: [{...this.feed.rss.channel[0]}]} };
        const newItem = [newEpisode(), ...newFeed.rss.channel[0].item];
        newFeed.rss.channel[0].item = newItem;
        
        return newFeed;
    }
}

export const newEpisode = () => {
    return {
        'title': ['New Episode'],
        'dc:creator': [''],
        'pubDate': [''],
        'link': [''],
        'guid': [{$: {isPermaLink: 'false'}}],
        'description': [''], /*CDATA*/
        'itunes:author': [''],
        'itunes:subtitle': [''],
        'itunes:explicit': ['no'],
        'itunes:duration': [''],
        'itunes:image': [ { $: { href: "" } } ],
        'content:encoded': [''], /*CDATA*/
        'enclosure': [ { $: {isDefault: "", length: "", medium: "", type: "", url: ""}}],
        'media:content':[ { $: {isDefault: "", length: "", medium: "", type: "", url: ""}}],
    }
}

export const newFeed = () => {
    return {
        rss: {
            $: {
                "version": "2.0",
                "xmlns:admin":"http://webns.net/mvcb/",
                "xmlns:atom":"http://www.w3.org/2005/Atom/",
                "xmlns:content":"http://purl.org/rss/1.0/modules/content/",
                "xmlns:dc":"http://purl.org/dc/elements/1.1/",
                "xmlns:itunes":"http://www.itunes.com/dtds/podcast-1.0.dtd",
                "xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "xmlns:sy":"http://purl.org/rss/1.0/modules/syndication/"
            },
            channel: [
                {
                    "title": [""],
                    "link": [""],
                    "description": [""],
                    "copyright": [""],
                    "pubDate": [""],
                    "language": [""],
                    "itunes:author": [""],
                    "itunes:block": [""],
                    "itunes:explicit": [""],
                    "itunes:keywords": [""],
                    "itunes:category": [ { $: { text: "" } } ],
                    "itunes:image": [ { $: { href: "" } } ],
                    "itunes:owner": [
                        {
                            "itunes:email": [""],
                            "itunes:name": [""]
                        }
                    ],
                    "item": []
                }
            ]
        }
    }
}