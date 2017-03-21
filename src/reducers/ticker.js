import * as actions from '../actions';

const initialState = {
  USDT_ETH: '',
  processing: true,
};

const TODOReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_TICKER_SUCCESS:
      return Object.assign({}, state, {
        USDT_ETH: action.data.USDT_ETH.last,
        processing: false,
      });
    case actions.UPDATE_TICKER_SUCCESS: {
      const last = action.data[1];
      return Object.assign({}, state, {
        USDT_ETH: last,
        processing: false,
      });
    }
    default:
      return state;
  }
};

export default TODOReducer;
