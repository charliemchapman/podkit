import React from 'react';
import ReactDOM from 'react-dom';
require('typeface-roboto');
require('material-design-icons');
import styles from './styles/index.scss';
import ElectronEntry from './entry/ElectronEntry';

ReactDOM.render(
    <ElectronEntry/>,
    document.getElementById('react-app')
  );