import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [];

const mockStore = configureStore(middlewares);

export const USDT_ETH = '44';

export const deal = {
  id: '1234',
  customerPaying: true,
  amount: '10',
  paidAmount: '10.3',
  receivedAmount: '10',
  commission: '0.3',
  date: '2017-01-01',
  customerName: 'New',
  contractorName: 'New',
};

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
    deals: [deal],
  },
});

export const noop = function () {};
