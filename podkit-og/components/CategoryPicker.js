import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Typography, Button } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

export default ({label, value, onChange, onRemove, categoryOptions})=>{
    const selected = value || "none";

    const categoryMenuItems = categoryOptions.map(c=>{
        return <MenuItem value={c.value}>{c.name}</MenuItem>
    })

    return (
        <div className="select-input category-picker">
            <div>
                <Typography variant="caption">{label}</Typography>
                <Select
                    value={selected}
                    onChange={onChange}>
                    <MenuItem value="none">None</MenuItem>
                    { categoryMenuItems }
                </Select>
            </div>
            <Button onClick={onRemove}>Remove</Button>
        </div>
    )
}