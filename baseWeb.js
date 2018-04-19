import React from 'react';
import ReactDOM from 'react-dom';
require('typeface-roboto');
require('material-design-icons');
import styles from './styles/index.scss';
import WebEntry from './entry/WebEntry';

ReactDOM.render(
    <WebEntry/>,
    document.getElementById('react-app')
  );