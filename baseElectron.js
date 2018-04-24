import React from 'react';
import ReactDOM from 'react-dom';
require('typeface-roboto');
require('material-design-icons');
import styles from './styles/index.scss';
import ElectronEntry from './entry/ElectronEntry';
import { MuiThemeProvider }  from 'material-ui/styles'
import { muiTheme } from './helpers/themeHelper';

ReactDOM.render(
    <MuiThemeProvider theme={muiTheme}><ElectronEntry/></MuiThemeProvider>,
    document.getElementById('react-app')
  );