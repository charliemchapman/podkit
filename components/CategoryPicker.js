import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { categories } from '../helpers/SupportedCategories'

export default ({label, value, onChange})=>{
    const selected = value || "none";

    const categoryMenuItems = categories.map(c=>{
        return <MenuItem value={c.value}>{c.name}</MenuItem>
    })

    return (
        <div className="label-input">
            <Select
                value={selected}
                onChange={onChange}>
                <MenuItem value="none">None</MenuItem>
                { categoryMenuItems }
            </Select>
        </div>
    )
}