import reducer from '../../reducers/ticker';
import * as actions from '../../actions';

const returnedTicker = {
  USDT_ETH: {
    last: '49.46878506',
  },
};

const oneTick = ['USDT_ETH', '49.46878506', '49.46878503', '49.10314001', '0.12499136', '13622100.39908603', '275851.80287590', 0, '54.33333333', '43.89000403'];

const initialState = {
  USDT_ETH: '',
  processing: true,
};

describe('ticker reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual(initialState);
  });

  it('should update ticker state by object', () => {
    expect(
      reducer(initialState, actions.getTickerSuccess(returnedTicker)),
    ).toEqual({
      USDT_ETH: returnedTicker.USDT_ETH.last,
      processing: false,
    });
  });

  it('should update ticker state by array', () => {
    expect(
      reducer(initialState, actions.updateTickerSuccess(oneTick)),
    ).toEqual({
      USDT_ETH: oneTick[1],
      processing: false,
    });
  });
});
