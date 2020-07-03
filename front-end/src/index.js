import React from 'react';
import ReactDOM from 'react-dom';
import {RootProvider} from './js/store/Store';
import RootManager from './js/rootManager';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <RootProvider>
      <RootManager></RootManager>
    </RootProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();