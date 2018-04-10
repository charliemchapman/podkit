import React from 'react';
import ReactDOM from 'react-dom';
import Typography from 'material-ui/Typography';

export default ({label, value, onChange})=>{
    return (
        <div>
            <label><Typography variant="body1">{label}</Typography></label>
            <input value={value} onChange={onChange}/>
        </div>
    )
}