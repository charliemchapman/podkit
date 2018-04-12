import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

export default ({openFile, newFile})=>{
    return (
        <div className="open-feed">
            <Button onClick={openFile} variant="raised" color="primary">OPEN</Button>
            <Button onClick={newFile} variant="raised" color="secondary">NEW</Button>
        </div>
    );
}