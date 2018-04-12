import React from 'react';
import ReactDOM from 'react-dom';
import Typography from 'material-ui/Typography';

export default ({label, value, onChange})=>{
    return (
        <div>
            <Typography variant="body1">{label}</Typography>
            <input value={value} onChange={onChange}/>
        </div>
    )
}