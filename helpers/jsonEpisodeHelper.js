export const xmlEpisodeToJson = (xmlEpisode) => {
    return {
        title: xmlEpisode.title[0],
        content: xmlEpisode["content:encoded"][0],
        description: xmlEpisode.description[0],
        guid: xmlEpisode.guid[0],
        author: xmlEpisode["itunes:author"] ? xmlEpisode["itunes:author"][0] : "",
        duration: xmlEpisode["itunes:duration"] ? xmlEpisode["itunes:duration"][0] : "",
        explicit: xmlEpisode["itunes:explicit"] ? xmlEpisode["itunes:explicit"][0] : "",
        image: xmlEpisode["itunes:image"][0].$.href,
        subtitle: xmlEpisode["itunes:subtitle"] ? xmlEpisode["itunes:subtitle"][0] : "",
        summary: xmlEpisode["itunes:summary"] ? xmlEpisode["itunes:summary"][0] : "",
        link: xmlEpisode.link[0],
        pubDate: xmlEpisode.pubDate[0]
    };
}

export const createEmptyJsonEpisode = () => {
    return {
        title: "New Episode",
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
        'media:content':[ { $: {isDefault: "", length: "", medium: "", type: "", url: ""}}]
    }
}