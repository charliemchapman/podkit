import React from 'react';
import ReactDOM from 'react-dom';
import CategoryPicker from './CategoryPicker';
import { categories } from '../helpers/SupportedCategories'

export default ({jsonFeed, updateJsonFeed})=>{

    const onChange = (e)=> {console.log(e)};

    const categoryForms = jsonFeed.categories.map(category=>{
        let subCategoryForms;
        if (category.subcategories){
            subCategoryForms = category.subcategories.map(subcategory=>{
                const selectedCategory = categories.filter(c=>c.value === category.categoryName || c.name === category.categoryName)[0];
                const categoryOptions = selectedCategory ? selectedCategory.subcategories : [];
                console.log(selectedCategory, categoryOptions, subcategory)
                return (
                    <div>
                        <CategoryPicker label="Subcategory" value={subcategory.categoryName} onChange={onChange} categoryOptions={categoryOptions}/>
                    </div>);
            });
        }

        return (
            <div>
                <CategoryPicker label="Category" value={category.categoryName} onChange={onChange} categoryOptions={categories}/>
                {subCategoryForms}
            </div>);
    });

    return (
        <div>
            { categoryForms }
        </div>
    )
}