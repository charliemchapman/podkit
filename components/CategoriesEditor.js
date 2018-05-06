import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import CategoryPicker from './CategoryPicker';
import { categories } from '../helpers/SupportedCategories'



export default ({jsonFeed, updateJsonFeed})=>{
    const onChange = (e)=> {console.log(e)};

    const GetSubcategoryPicker = (subcategory, category, categoryIndex, subcategoryIndex)=>{
        const selectedCategory = categories.filter(c=>c.value === category.categoryName || c.name === category.categoryName)[0];
        const subCategoryOptions = selectedCategory ? selectedCategory.subcategories : [];

        const onSubcategoryChange = (e, subCategoryIndex) => {
            const newValue = e.target.value;
            const newFeed = {...jsonFeed};
            newFeed.categories = [...jsonFeed.categories];
            newFeed.categories[categoryIndex] = {...jsonFeed.categories[categoryIndex]};
            newFeed.categories[categoryIndex].subcategories = [...jsonFeed.categories[categoryIndex].subcategories];
            newFeed.categories[categoryIndex].subcategories[subCategoryIndex] = {categoryName: newValue};
            updateJsonFeed(newFeed);
        };

        return (
            <div>
                <CategoryPicker label="Subcategory" value={subcategory.categoryName} onChange={(e)=>onSubcategoryChange(e, subcategoryIndex)} categoryOptions={subCategoryOptions}/>
            </div>);
    }

    const GetCategoryPicker = (category, index) => {
        let subCategoryForms;
        let addSubcategoryButton;
        if (category.subcategories){
            subCategoryForms = category.subcategories.map((subcategory,subcategoryIndex)=>{
                return GetSubcategoryPicker(subcategory, category, index, subcategoryIndex);
            });
        }

        const addSubcategory = (index)=> {
            const newFeed = {...jsonFeed};
            newFeed.categories = [...jsonFeed.categories];
            const oldSubcategories = jsonFeed.categories[index].subcategories || [];
            newFeed.categories[index] = {...jsonFeed.categories[index], subcategories: [...oldSubcategories, {categoryName: ""}]};
            updateJsonFeed(newFeed);
        }

        const onCategoryChange = (e, index)=> {
            const newValue = e.target.value;
            const newFeed = {...jsonFeed};
            newFeed.categories = [...jsonFeed.categories];
            newFeed.categories[index] = {categoryName: newValue};
            updateJsonFeed(newFeed);
        }

        return (
            <div>
                <CategoryPicker label="Category" value={category.categoryName} onChange={(e)=>onCategoryChange(e, index)} categoryOptions={categories}/>
                {subCategoryForms}
                <Button onClick={()=>addSubcategory(index)}>Add Subcategory</Button>
            </div>);
    }

    const categoryForms = jsonFeed.categories.map((category, index)=>{
        return GetCategoryPicker(category, index);
    });

    const addCategory = ()=> {
        const newFeed = {...jsonFeed};
        newFeed.categories = [...jsonFeed.categories, {categoryName: ""}];
        updateJsonFeed(newFeed);
    }

    return (
        <div>
            { categoryForms }
            <Button onClick={addCategory}>Add Category</Button>
        </div>
    )
}