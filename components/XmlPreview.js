import React from 'react';
import ReactDOM from 'react-dom';
import { jsonToXmlFeed } from '../helpers/jsonFeedHelper';
const xml2js = require('xml2js');

export default ({jsonFeed})=>{
    const xml = jsonToXmlFeed(jsonFeed);
    var builder = new xml2js.Builder({cdata:true});
    let xmlString;
    try {
        xmlString = builder.buildObject(xml);
    }
    catch(err){
        console.error(err);
        xmlString = 'error... but really... who cares this is for debugging anyway'
    }

    return (
        <div className="xml-popup">
            <textarea
                value={xmlString}
                className="xml-popup__textArea"
            />
        </div>
    )
}