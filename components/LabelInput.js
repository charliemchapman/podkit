import React from 'react';
import ReactDOM from 'react-dom';

export default ({label, value, onChange})=>{
    return (
        <div>
            <label>{label}</label>
            <input value={value} onChange={onChange}/>
        </div>
    )
}