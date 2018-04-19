import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    input: {
      display: 'none',
    }
  });

export const OpenFeed = ({classes, openFile, newFile, isElectron})=>{
    const open = (event)=>{
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          openFile(text);
        };
        reader.readAsText(input.files[0]);
    }

    const getOpenButton = () => {
        if (isElectron){
            return <Button onClick={openFile} variant="raised" color="primary">OPEN</Button>;
        }    
        else {
            return (
                <div>
                    <input
                        accept="*"
                        className={classes.input}
                        id="raised-button-file"
                        type="file"
                        onChange={open}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" color="primary" component="span" className={classes.button}>
                            OPEN
                        </Button>
                    </label>
                </div>
            );
        }
    };

    return (
        <div className="open-feed">
            { getOpenButton() }
            <Button onClick={newFile} variant="raised" color="secondary">NEW</Button>
        </div>
    );
}

export default withStyles(styles)(OpenFeed);