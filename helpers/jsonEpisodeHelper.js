export const xmlEpisodeToJson = (xmlEpisode) => {
    return {
        title: xmlEpisode.title[0],
        contentEncoded: xmlEpisode["content:encoded"] ? xmlEpisode["content:encoded"][0] : "",
        description: xmlEpisode.description[0],
        guid: getGuidFromXmlFeed(xmlEpisode.guid),
        author: xmlEpisode["itunes:author"] ? xmlEpisode["itunes:author"][0] : "",
        duration: xmlEpisode["itunes:duration"] ? xmlEpisode["itunes:duration"][0] : "",
        explicit: xmlEpisode["itunes:explicit"] ? xmlEpisode["itunes:explicit"][0] : "",
        image: xmlEpisode["itunes:image"] ? xmlEpisode["itunes:image"][0].$.href : "",
        subtitle: xmlEpisode["itunes:subtitle"] ? xmlEpisode["itunes:subtitle"][0] : "",
        summary: xmlEpisode["itunes:summary"] ? xmlEpisode["itunes:summary"][0] : "",
        episodeType: xmlEpisode["itunes:episodeType"] ? xmlEpisode["itunes:episodeType"][0] : "",
        link: xmlEpisode.link[0],
        pubDate: xmlEpisode.pubDate[0]
    };
}

export const createEmptyJsonEpisode = () => {
    return {
        title: "New Episode",
        contentEncoded: "",
        pubDate: "",
        link: "",
        guid: null,
        description: "",
        author: "",
        subtitle: "",
        explicit: false,
        duration: "",
        episodeType: ""
    };
}

export const episodeJsonToXmlFeed = (episodeJson) => {
    return {
        'title': [episodeJson.title],
        'pubDate': [episodeJson.pubDate],
        'guid': getXmlGuidFromJsonFeed(episodeJson.guid),
        'link': [episodeJson.link],
        //'itunes:image': [ { $: { href: episodeJson.image } } ],
        'description': [episodeJson.description], /*CDATA*/
        'content:encoded': [episodeJson.contentEncoded], /*CDATA*/
        'itunes:duration': [episodeJson.duration],
        'itunes:explicit': ['no'],
        'itunes:subtitle': [episodeJson.subtitle],
        'itunes:episodeType': [episodeJson.episodeType]
    }
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