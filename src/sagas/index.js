import { fork } from 'redux-saga/effects';
import { getTicker, wsSagas } from './ticker';
import { watchCreateDeal, watchRemoveDeal } from './deal';

export default function* () {
  yield [
    fork(getTicker),
    fork(wsSagas),
    fork(watchCreateDeal),
    fork(watchRemoveDeal),
  ];
}
