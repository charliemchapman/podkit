import * as moment from 'moment';
import { xmlEpisodeToJson, episodeJsonToXmlFeed, createEmptyJsonEpisode } from './jsonEpisodeHelper';

function getXmlChannelValue(xmlFeed, channelAttr) {
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0][channelAttr] && xmlFeed.rss.channel[0][channelAttr][0]){
        return xmlFeed.rss.channel[0][channelAttr][0].trim()
    }
    return "";
}

function getXmlChannelCategoriesValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'].length > 0){
        return xmlFeed.rss.channel[0]['itunes:category'].map(category=>{
            return getXmlChannelCategoryValue(category);
        });
    }
}

function getXmlChannelCategoryValue(xmlCategory){
    if (xmlCategory['$']){
        const jsonCategory = {
            categoryName: xmlCategory['$'].text
        };

        if (xmlCategory['itunes:category'] && xmlCategory['itunes:category'].length > 0){
            jsonCategory.subcategories = xmlCategory['itunes:category'].map(xmlSubcategory=>{
                return getXmlChannelCategoryValue(xmlSubcategory);
            });
        }
        return jsonCategory;
    }
    return {categoryName: ""};
}

function getXmlChannelSubCategoryValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'][0]['$']
        && xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'] && xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'][0]['$']){
        return xmlFeed.rss.channel[0]['itunes:category'][0]['itunes:category'][0]['$'].text;
    }
    return "";
}

function getXmlChannelImageValue(xmlFeed){
    if (xmlFeed.rss && xmlFeed.rss.channel && xmlFeed.rss.channel[0] && xmlFeed.rss.channel[0]['itunes:image'] && xmlFeed.rss.channel[0]['itunes:image'][0] && xmlFeed.rss.channel[0]['itunes:image'][0]['$']){
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
        language: getXmlChannelValue(xmlFeed, 'language'),
        author: getXmlChannelValue(xmlFeed, 'itunes:author'),
        block: getXmlChannelValue(xmlFeed, 'block'),
        explicit: getXmlChannelValue(xmlFeed, 'itunes:explicit'),
        keywords: getXmlChannelValue(xmlFeed, 'keywords'),
        categories: getXmlChannelCategoriesValue(xmlFeed),
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
        language: "en-US",
        author: "",
        block: "No",
        explicit: "No",
        keywords: "",
        categories: [{categoryName: ""}],
        image: "",
        owner: [],
        episodes: []
    };

    return jsonFeed;
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
                    "lastBuildDate": [jsonFeed.lastBuildDate],
                    "language": [jsonFeed.language],
                    "itunes:author": [jsonFeed.author],
                    "itunes:block": [ jsonFeed.block || "No" ],
                    "itunes:explicit": [jsonFeed.explicit],
                    "itunes:keywords": [jsonFeed.keywords],
                    "itunes:image": [ { $: { href: jsonFeed.image } } ],
                    "itunes:owner": [
                        {
                            "itunes:email": [jsonFeed.owner.email],
                            "itunes:name": [jsonFeed.owner.name]
                        }
                    ]
                }
            ]
        }
    }

    if (jsonFeed.categories.length > 0){
        newXml.rss.channel[0]["itunes:category"] = getXmlCategoriesFromJson(jsonFeed.categories);
    }

    // Always add episodes at the end so they're at the bottom of the xml file
    newXml.rss.channel[0].item = jsonFeed.episodes.map(e=>episodeJsonToXmlFeed(e));

    return newXml;
}

function getXmlCategoriesFromJson(jsonCategories) {
    const xmlCategories = jsonCategories.map(jsonCategory=>{
        const xmlCategory = { $: { text: jsonCategory.categoryName } };
        if (jsonCategory.subcategories) {
            xmlCategory['itunes:category'] = getXmlCategoriesFromJson(jsonCategory.subcategories);
        }
        return xmlCategory;
    });

    return xmlCategories;
}

export const addEpisode = (jsonFeed) => {
    return {
        ...jsonFeed,
        episodes: [
            createEmptyJsonEpisode(jsonFeed),
            ...jsonFeed.episodes
        ]
    }
}