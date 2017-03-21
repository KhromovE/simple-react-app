export const GET_TICKER_SUCCESS = 'GET_TICKER_SUCCESS';
export const UPDATE_TICKER_SUCCESS = 'UPDATE_TICKER_SUCCESS';

export const CREATE_DEAL = 'CREATE_DEAL';
export const CREATE_DEAL_SUCCESS = 'CREATE_DEAL_SUCCESS';
export const REMOVE_DEAL = 'REMOVE_DEAL';
export const REMOVE_DEAL_SUCCESS = 'REMOVE_DEAL_SUCCESS';

export function getTickerSuccess(data) {
  return {
    type: GET_TICKER_SUCCESS,
    data,
  };
}

export function updateTickerSuccess(data) {
  return {
    type: UPDATE_TICKER_SUCCESS,
    data,
  };
}

export function createDeal(data) {
  return {
    type: CREATE_DEAL,
    data,
  };
}

export function createDealSuccess(data) {
  return {
    type: CREATE_DEAL_SUCCESS,
    data,
  };
}

export function removeDeal(id) {
  return {
    type: REMOVE_DEAL,
    id,
  };
}

export function removeDealSuccess(id) {
  return {
    type: REMOVE_DEAL_SUCCESS,
    id,
  };
}
