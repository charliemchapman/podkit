import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, withStyles } from 'material-ui';

const moment = require('moment');

const styles = theme => ({
    textField: {
      marginTop: '18px',
    },
  });

const DateAndTimePickers = ({label, value, onChange, classes})=>{
    const dateTime = moment(value);
    const formattedDateTime = dateTime.format('YYYY-MM-DDThh:mm')

    return (
        <TextField
            id="datetime-local"
            label={label}
            type="datetime-local"
            value={formattedDateTime}
            className={classes.textField}
            onChange={onChange}
        />
    );
}

export default withStyles(styles)(DateAndTimePickers);
