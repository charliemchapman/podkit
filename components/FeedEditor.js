import React from 'react';
import ReactDOM from 'react-dom'; 
import LabelInput from './LabelInput';
import Typography from 'material-ui/Typography';
import RSSHelper from '../helpers/RSSHelper';
import CategoryPicker from './CategoryPicker';
import YesNoPicker from './YesNoPicker';
import { categories } from '../helpers/SupportedCategories'
import CategoriesEditor from './CategoriesEditor';

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

    getExplicitForm() {
        const { jsonFeed, updateJsonFeed } = this.props;

        const onChange = (e)=>{
            const newValue = e.target.value;
            const newFeed = { ...jsonFeed };
            newFeed.explicit = newValue;
            updateJsonFeed(newFeed);
        };
        return <YesNoPicker label={'itunes:explicit'} value={jsonFeed.explicit} onChange={onChange}/>
    }

    getImageDisplay(){
        const jsonFeed = this.props.jsonFeed;
        const imageUrl = jsonFeed.image;

        return (
            <div className="feed-image__img">
                <img src={imageUrl} alt="Feed Image"/>
            </div>
        );

    }
    getImageForm(){
        const { jsonFeed, updateJsonFeed } = this.props;

        const onChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed.image = e.target.value;
            updateJsonFeed(newFeed);
        }
        const value = jsonFeed.image;
        
        return (
            <div className="episode-image">
                <div className="episode-image__img">
                    <img src={value} alt={'episode image'}/>
                </div>
                <LabelInput label={'image'} value={value} onChange={onChange}/>
            </div>
        )
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

    getMultilineForm(label, property){
        const jsonFeed = this.props.jsonFeed;
        const onChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed[property] = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }
        return <LabelInput label={label} value={jsonFeed[property]} onChange={onChange} multiline={true}/>;
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

    getOwnerForm(){
        const jsonFeed = this.props.jsonFeed;
        const onNameChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed.owner.name = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }
        const onEmailChange = (e) => {
            const newFeed = { ...jsonFeed };
            newFeed.owner.email = e.target.value;
            this.props.updateJsonFeed(newFeed);
        }

        return <div>
                <LabelInput label="Owner Name" value={jsonFeed.owner.name} onChange={onNameChange}/>
                <LabelInput label="Owner Email" value={jsonFeed.owner.email} onChange={onEmailChange}/>
        </div>;
    }

    getFeedForm() {
        return (
            <div className="feed-settings">
                <section className="feed-image">
                    { this.getImageDisplay() }
                </section>
                <section className="simple-fields">
                    { this.getForm('Title', 'title') }
                    { this.getForm('Link', 'link') }
                    { this.getForm('Language', 'language') }
                    { this.getForm('Author', 'author') }
                    { this.getOwnerForm() }
                    { this.getForm('Image', 'image') }
                    { this.getMultilineForm('Subtitle', 'subtitle') }
                    { this.getForm('Summary', 'summary') }
                    <CategoriesEditor jsonFeed={this.props.jsonFeed} updateJsonFeed={this.props.updateJsonFeed}/>
                    { this.getExplicitForm() }
                </section>
            </div>
        );
    }
}

export default FeedEditor;