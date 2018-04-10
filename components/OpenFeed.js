import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

export default ({openFile})=>{
    return (
        <div className="open-feed">
            <Button onClick={openFile} variant="raised" color="primary">Open</Button>
        </div>
    );
}