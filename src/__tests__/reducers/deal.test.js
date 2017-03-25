import reducer from '../../reducers/deal';
import * as actions from '../../actions';

import { deal } from '../../services/tests';

const initialState = {
  deals: [],
};

describe('deal reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual(initialState);
  });

  it('should add deal to state', () => {
    expect(
      reducer(initialState, actions.createDealSuccess(deal)),
    ).toEqual({
      deals: [deal],
    });
  });

  it('should remove deal from state', () => {
    expect(
      reducer({ deals: [deal] }, actions.removeDealSuccess(deal.id)),
    ).toEqual({
      deals: [],
    });
  });
});
