import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Typography } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

export default ({label, value, onChange})=>{
    const selected = value ? value.toLowerCase() : "no";

    return (
        <div className="select-input">
            <Typography variant="caption">{label}</Typography>
            <Select
                value={selected}
                onChange={onChange}>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="clean">Clean</MenuItem>
            </Select>
        </div>
    )
}