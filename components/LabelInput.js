import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Typography } from 'material-ui';

export default ({label, value, onChange})=>{
    return (
        <div className="label-input">
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                fullWidth
                margin="normal"/>
        </div>
    )
}