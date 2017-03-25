import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [];

const mockStore = configureStore(middlewares);

export const USDT_ETH = '44';

export const store = mockStore({
  ticker: {
    USDT_ETH: USDT_ETH,
    processing: true,
  },
  deal: {
    deals: [],
  },
});

export const fullStore = mockStore({
  ticker: {
    USDT_ETH: USDT_ETH,
    processing: false,
  },
  deal: {
    deals: [
      {
        id: '1234',
        customerPaying: true,
        amount: '10',
        paidAmount: '10.3',
        receivedAmount: '10',
        commission: '0.3',
        date: '2017-01-01',
        customerName: 'New',
        contractorName: 'New',
      },
    ],
  },
});

export const TestProvider = ({ store, children }) => (<Provider store={store}>children</Provider>);  // eslint-disable-line

export const noop = function () {};
