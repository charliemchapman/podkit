import React from 'react';
import ReactDOM from 'react-dom';
require('typeface-roboto');
require('material-design-icons');
import styles from './styles/index.scss';
import App from './components/App';

ReactDOM.render(
    <App/>,
    document.getElementById('react-app')
  );