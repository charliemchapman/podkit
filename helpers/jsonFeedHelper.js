import { xmlEpisodeToJson, episodeJsonToXmlFeed, createEmptyJsonEpisode } from './jsonEpisodeHelper';

function getXmlChannelValue(xmlFeed, channelAttr) {
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0][channelAttr]){
        return xmlFeed.rss.channel[0][channelAttr][0]
    }
    return "";
}

function getXmlChannelCategoryValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category']['$']){
        xmlFeed.rss.channel[0]['itunes:category'][0]['$'].text
    }
    return "";
}

function getXmlChannelImageValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:image'] && xmlFeed.rss.channel[0]['itunes:image']['$']){
        return xmlFeed.rss.channel[0]['itunes:image'][0]['$'].href;
    }
    return "";
}

function getJsonEpisodes(xmlFeed){
    const items = xmlFeed.rss.channel[0].item;
    return items.map(item=> {
        return xmlEpisodeToJson(item)
    });
}

export const createJsonFeed = (xmlFeed) => {
    const jsonFeed = {
        title: getXmlChannelValue(xmlFeed, 'title'),
        link: getXmlChannelValue(xmlFeed, 'link'),
        description: getXmlChannelValue(xmlFeed, 'description'),
        copyright: getXmlChannelValue(xmlFeed, 'copyright'),
        pubDate: getXmlChannelValue(xmlFeed, 'pubDate'),
        language: getXmlChannelValue(xmlFeed, 'language'),
        author: getXmlChannelValue(xmlFeed, 'author'),
        block: getXmlChannelValue(xmlFeed, 'block'),
        explicit: false,
        keywords: getXmlChannelValue(xmlFeed, 'keywords'),
        category: getXmlChannelCategoryValue(xmlFeed),
        image: getXmlChannelImageValue(xmlFeed),
        owner: [],
        episodes: getJsonEpisodes(xmlFeed)
    };

    return jsonFeed;
} 

export const createEmptyJsonFeed = () => {
    const jsonFeed = {
        title: "",
        link: "",
        description: "",
        copyright: "",
        pubDate: "",
        language: "",
        author: "",
        block: "",
        explicit: false,
        keywords: "",
        category: "",
        image: "",
        owner: [],
        episodes: []
    };
}

export const jsonToXmlFeed = (jsonFeed) => {
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
                    "title": [jsonFeed.title],
                    "link": [jsonFeed.link],
                    "description": [jsonFeed.description],
                    "copyright": [jsonFeed.copyright],
                    "pubDate": [jsonFeed.pubDate],
                    "language": [jsonFeed.language],
                    "itunes:author": [jsonFeed.author],
                    "itunes:block": [jsonFeed.block],
                    "itunes:explicit": [jsonFeed.explicit.toString()],
                    "itunes:keywords": [jsonFeed.keywords],
                    "itunes:category": [ { $: { text: jsonFeed.category } } ],
                    "itunes:image": [ { $: { href: jsonFeed.image } } ],
                    "itunes:owner": [
                        {
                            "itunes:email": [""],
                            "itunes:name": [""]
                        }
                    ],
                    "item": jsonFeed.episodes.map(e=>episodeJsonToXmlFeed(e))
                }
            ]
        }
    }
}

export const addEpisode = (jsonFeed) => {
    return {
        ...jsonFeed,
        episodes: [
            createEmptyJsonEpisode(),
            ...jsonFeed.episodes
        ]
    }
}