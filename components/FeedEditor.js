import React from 'react';
import ReactDOM from 'react-dom'; 
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import RSSHelper from '../helpers/RSSHelper';
import CategoryPicker from './CategoryPicker';
import { categories } from '../helpers/SupportedCategories'

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
            <div className="select-input">
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

    getCategoryForm(){
        const jsonFeed = this.props.jsonFeed;
        const onChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed.category = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }

        return <CategoryPicker label="Category" value={jsonFeed.category} onChange={onChange} categoryOptions={categories}/>
    }

    getSubcategoryForm(){
        const jsonFeed = this.props.jsonFeed;
        const selectedCategoryMatches = categories.filter(c=>c.value==jsonFeed.category || c.name==jsonFeed.category);
        const selectedCategory = selectedCategoryMatches.length > 0 ? selectedCategoryMatches[0] : null;

        if (!selectedCategory || !selectedCategory.subcategories) return;

        const onChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed.subcategory = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }
        
        return <CategoryPicker label="Subcategory" value={jsonFeed.subcategory} onChange={onChange} categoryOptions={selectedCategory.subcategories}/>
    }

    getFeedForm() {
        return (
            <div className="feed-settings">
                <section className="simple-fields">
                    { this.getForm('Title', 'title') }
                    { this.getForm('Link', 'link') }
                    { this.getForm('lastBuildDate', 'lastBuildDate') }
                    { this.getForm('Language', 'language') }
                    { this.getForm('Subtitle', 'subtitle') }
                    { this.getForm('Author', 'author') }
                    { this.getForm('Summary', 'itunes:summary') }
                    { this.getForm('Image Url', 'image') }
                    { this.getCategoryForm() }
                    { this.getSubcategoryForm()}
                    { this.getExplicitForm() }
                </section>
            </div>
        );
    }
}

export default FeedEditor;