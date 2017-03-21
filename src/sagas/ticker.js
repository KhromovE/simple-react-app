import { put, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import api from '../services/api';
import * as actions from '../actions';
import autobahn from 'autobahn';

const wsUrl = 'wss://api.poloniex.com';

export function* getTicker() {
  try {
    const ticker = yield call(api.getTicker);
    yield put(actions.getTickerSuccess(ticker));
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
}

function initWebsocket() {
  return eventChannel((emitter) => {
    const connection = new autobahn.Connection({
      url: wsUrl,
      realm: 'realm1',
    });

    connection.onopen = (session) => {
      function tickerEvent(args) {
        if (args[0] === 'USDT_ETH') {
          emitter(actions.updateTickerSuccess(args));
        }
      }
      session.subscribe('ticker', tickerEvent);
    };

    connection.onclose = () => {
      console.log('Websocket connection closed'); // eslint-disable-line
    };

    connection.open();

    return () => {
      connection.close();
    };
  });
}

export function* wsSagas() {
  const channel = yield call(initWebsocket);
  while (true) { // eslint-disable-line
    const action = yield take(channel);
    yield put(action);
  }
}
