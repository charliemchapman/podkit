import React from 'react';
import ReactDOM from 'react-dom';
require('typeface-roboto');
require('material-design-icons');
import styles from './styles/index.scss';
import AppWeb from './components/AppWeb';

ReactDOM.render(
    <AppWeb/>,
    document.getElementById('react-app')
  );