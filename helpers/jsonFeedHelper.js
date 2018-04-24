import { xmlEpisodeToJson, episodeJsonToXmlFeed, createEmptyJsonEpisode } from './jsonEpisodeHelper';

function getXmlChannelValue(xmlFeed, channelAttr) {
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0][channelAttr] && xmlFeed.rss.channel[0][channelAttr][0]){
        return xmlFeed.rss.channel[0][channelAttr][0].trim()
    }
    return "";
}

function getXmlChannelCategoryValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'][0]['$']){
        return xmlFeed.rss.channel[0]['itunes:category'][0]['$'].text
    }
    return "";
}

function getXmlChannelSubCategoryValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'][0]['$']
        && xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'][0]['$']){
        return xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'][0]['$'].text;
    }
    return "";
}

function getXmlChannelImageValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:image'] && xmlFeed.rss.channel[0]['itunes:image']['$']){
        return xmlFeed.rss.channel[0]['itunes:image'][0]['$'].href;
    }
    return "";
}

function getXmlChannelOwnerValue(xmlFeed) {
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:owner'] && xmlFeed.rss.channel[0]['itunes:owner'][0]) {
        const xmlOwner = xmlFeed.rss.channel[0]['itunes:owner'][0];
        return {
            name : xmlOwner['itunes:name'] && xmlOwner ['itunes:name'][0] ? xmlOwner['itunes:name'][0].trim() : "",
            email : xmlOwner['itunes:email'] && xmlOwner ['itunes:email'][0] ? xmlOwner['itunes:email'][0].trim() : "",
        }  
    }
};

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
        author: getXmlChannelValue(xmlFeed, 'itunes:author'),
        block: getXmlChannelValue(xmlFeed, 'block'),
        explicit: getXmlChannelValue(xmlFeed, 'itunes:explicit'),
        keywords: getXmlChannelValue(xmlFeed, 'keywords'),
        category: getXmlChannelCategoryValue(xmlFeed),
        subcategory: getXmlChannelSubCategoryValue(xmlFeed),
        image: getXmlChannelImageValue(xmlFeed),
        owner: getXmlChannelOwnerValue(xmlFeed),
        episodes: getJsonEpisodes(xmlFeed),
        subtitle: getXmlChannelValue(xmlFeed, 'itunes:subtitle'),
        summary: getXmlChannelValue(xmlFeed, 'itunes:summary')
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
        explicit: "No",
        keywords: "",
        category: "",
        image: "",
        owner: [],
        episodes: []
    };
}

export const jsonToXmlFeed = (jsonFeed) => {
    const newXml = {
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
                    "itunes:explicit": [jsonFeed.explicit],
                    "itunes:keywords": [jsonFeed.keywords],
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

    if (jsonFeed.category){
        newXml.rss.channel[0]["itunes:category"] = [ { $: { text: jsonFeed.category } } ];
        if (jsonFeed.subcategory){
            newXml.rss.channel[0]["itunes:category"][0]["itunes:category"] = [ { $: { text: jsonFeed.subcategory } } ];
        }
    }

    return newXml;
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