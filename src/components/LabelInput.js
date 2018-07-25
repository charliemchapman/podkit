import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Typography } from 'material-ui';

export default ({label, value, onChange, multiline})=>{
    return (
        <div className="label-input">
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                fullWidth
                margin="normal"
                multiline={multiline}/>
        </div>
    )
}