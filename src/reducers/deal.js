import * as actions from '../actions';

const initialState = {
  deals: [],
};

const DealReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_DEAL_SUCCESS:
      return Object.assign({}, state, {
        deals: [action.data, ...state.deals],
      });
    case actions.REMOVE_DEAL_SUCCESS: {
      const removingDealIndex = state.deals.findIndex(deal => deal.id === action.id);
      return Object.assign({}, state, {
        deals: [
          ...state.deals.slice(0, removingDealIndex),
          ...state.deals.slice(removingDealIndex + 1),
        ],
      });
    }
    default:
      return state;
  }
};

export default DealReducer;
