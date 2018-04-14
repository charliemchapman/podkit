export const xmlEpisodeToJson = (xmlEpisode) => {
    return {
        title: xmlEpisode.title[0]
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