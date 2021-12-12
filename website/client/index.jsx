/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application. Hangs React app off of #app in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';

render(
  // Wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
