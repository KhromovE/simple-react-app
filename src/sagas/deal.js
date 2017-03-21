import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../services/api';

export function* createDeal({ data }) {
  try {
    const deal = yield call(api.createDeal, data);
    deal.id = (Math.random() * 10000).toFixed();

    yield put(actions.createDealSuccess(deal));
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
}

export function* removeDeal({ id }) {
  try {
    yield call(api.removeDeal, id);

    yield put(actions.removeDealSuccess(id));
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
}

export function* watchCreateDeal() {
  yield takeEvery(actions.CREATE_DEAL, createDeal);
}

export function* watchRemoveDeal() {
  yield takeEvery(actions.REMOVE_DEAL, removeDeal);
}
