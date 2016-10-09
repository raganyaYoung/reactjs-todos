import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App'
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.css';

let store = createStore(reducer, window.devToolsExtension && window.devToolsExtension())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)