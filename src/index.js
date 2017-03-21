import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';
import store from './store';
import { AppContainer } from 'react-hot-loader';

import './assets/styles/base.scss';
import { Provider } from 'react-redux';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>{router}</Provider>
    </AppContainer>,
    document.getElementById('root'), // eslint-disable-line no-undef
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router', render);
}
