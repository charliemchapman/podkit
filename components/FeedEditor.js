import React from 'react';
import ReactDOM from 'react-dom'; 
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import RSSHelper from '../helpers/RSSHelper';

class FeedEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.getFeedForm = this.getFeedForm.bind(this);
    }

    render() {
        return (
            <div>
                <Typography variant="headline">Feed Settings</Typography>
                { this.getFeedForm() }
            </div>
        );
    }

    getExplicitForm(){
        //TODO: make work ;)
        return (
            <div>
                <label><Typography variant="body1">Explicit</Typography></label>
                <input type="checkbox" checked={false}/>
            </div>
        );
    }

    getForm(label, property){
        const jsonFeed = this.props.jsonFeed;
        const onChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed[property] = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }
        return <LabelInput label={label} value={jsonFeed[property]} onChange={onChange}/>;
    }

    getFeedForm() {
        return (
            <div className="feed-settings">
                <section className="simple-fields">
                    { this.getForm('Title', 'title') }
                    { this.getForm('Link', 'link') }
                    { this.getForm('lastBuildDate', 'lastBuildDate') }
                    { this.getForm('Language', 'language') }
                    { this.getForm('Subtitle', 'itunes:subtitle') }
                    { this.getForm('Author', 'itunes:author') }
                    { this.getForm('Summary', 'itunes:summary') }
                    { this.getForm('Image Url', 'image') }
                    { this.getForm('Category', 'category') }
                    { this.getExplicitForm() }
                </section>
            </div>
        );
    }
}

export default FeedEditor;