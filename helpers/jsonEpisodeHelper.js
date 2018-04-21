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
        duration: ""
    };
}

export const episodeJsonToXmlFeed = (episodeJson) => {
    return {
        'title': [episodeJson.title],
        'pubDate': [episodeJson.pubDate],
        'link': [episodeJson.link],
        'guid': [{$: {isPermaLink: 'false'}}],
        'description': [episodeJson.description], /*CDATA*/
        'itunes:author': [episodeJson.author],
        'itunes:subtitle': [episodeJson.subtitle],
        'itunes:explicit': ['no'],
        'itunes:duration': [episodeJson.duration],
        'itunes:image': [ { $: { href: episodeJson.image } } ],
        'content:encoded': [episodeJson.contentEncoded], /*CDATA*/
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