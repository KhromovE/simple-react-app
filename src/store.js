import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import rootSaga from './sagas';
import DevTools from './containers/DevTool';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middlewares = [routerMiddleware(browserHistory), sagaMiddleware];

let store;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  store = createStore(
    combineReducers({
      routing: routerReducer,
      ...reducers,
    }),
    compose(applyMiddleware(...middlewares)),
  );
} else {
  /**
   * Only use the DevTools component
   * when in development.
   */
  const enhancer = compose(
    applyMiddleware(logger),
    DevTools.instrument(),
  );

  store = createStore(
    combineReducers({
      routing: routerReducer,
      ...reducers,
    }),
    compose(applyMiddleware(...middlewares), enhancer),
  );
}


sagaMiddleware.run(rootSaga);

export default store;
