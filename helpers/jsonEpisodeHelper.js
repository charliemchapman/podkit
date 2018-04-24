import * as moment from 'moment';
const uuidv4 = require('uuid/v4');

export const xmlEpisodeToJson = (xmlEpisode) => {
    return {
        title: xmlEpisode.title[0].trim(),
        description: xmlEpisode.description[0].trim(),
        guid: getGuidFromXmlFeed(xmlEpisode.guid).trim(),
        author: xmlEpisode["itunes:author"] ? xmlEpisode["itunes:author"][0].trim() : "",
        duration: xmlEpisode["itunes:duration"] ? xmlEpisode["itunes:duration"][0].trim() : "",
        explicit: xmlEpisode["itunes:explicit"] ? xmlEpisode["itunes:explicit"][0].trim() : "",
        image: xmlEpisode["itunes:image"] ? xmlEpisode["itunes:image"][0].$.href.trim() : "",
        subtitle: xmlEpisode["itunes:subtitle"] ? xmlEpisode["itunes:subtitle"][0].trim() : "",
        summary: xmlEpisode["itunes:summary"] ? xmlEpisode["itunes:summary"][0].trim() : "",
        episodeType: xmlEpisode["itunes:episodeType"] ? xmlEpisode["itunes:episodeType"][0].trim() : "",
        link: xmlEpisode.link[0].trim(),
        pubDate: xmlEpisode.pubDate[0].trim()
    };
}

export const createEmptyJsonEpisode = () => {
    return {
        title: "New Episode",
        pubDate: moment().utc().format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
        link: "",
        guid: uuidv4(),
        description: "",
        author: "",
        subtitle: "",
        explicit: false,
        duration: "00:00:00",
        episodeType: "full"
    };
}

export const episodeJsonToXmlFeed = (episodeJson) => {
    const xmlFeed = {
        'title': [episodeJson.title],
        'pubDate': [episodeJson.pubDate],
        'guid': getXmlGuidFromJsonFeed(episodeJson.guid),
        'link': [episodeJson.link],
        'description': [episodeJson.description], /*CDATA*/
        'content:encoded': [episodeJson.description], /*CDATA*/
        'itunes:duration': [episodeJson.duration],
        'itunes:explicit': ['no'],
        'itunes:subtitle': [episodeJson.subtitle],
        'itunes:episodeType': [episodeJson.episodeType]
    }

    if (episodeJson.image){
        xmlFeed['itunes:image'] = [ { $: { href: episodeJson.image } } ];
    }

    return xmlFeed;
}

function getGuidFromXmlFeed(xmlEpisodeGuid) {
    var guid = xmlEpisodeGuid 
        ? xmlEpisodeGuid[0]._
            ? xmlEpisodeGuid[0]._
            : xmlEpisodeGuid[0]
        : "";

    return guid.trim()
}

function getXmlGuidFromJsonFeed(guid) {
    const guidObj = {$: {isPermaLink: 'false'}};
    guidObj["_"] = guid;

    return [guidObj];
}