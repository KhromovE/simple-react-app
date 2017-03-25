import React from 'react';

import { DealsFilter } from '../../components/DealsFilter';
import { noop, fullStore, store, USDT_ETH } from '../../services/tests';

describe('AddDeal', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <DealsFilter
        USDT_ETH={USDT_ETH}
        deals={fullStore.getState().deal.deals}
        updateDealsList={noop}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should execute mock function', () => {
    const mockFn = jest.fn();
    const deals = fullStore.getState().deal.deals;
    const hugeValue = '1000';
    const storedValue = deals[0].amount;
    const amountName = 'amount';
    const options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired },
    };

    const wrapper = mount(
      <DealsFilter
        USDT_ETH={USDT_ETH}
        deals={deals}
        updateDealsList={mockFn}
      />,
      options,
    );

    // Set huge value to field amount
    wrapper.find(`[name="${amountName}"]`).simulate('change', {
      target: { value: hugeValue, name: amountName },
    });

    expect(wrapper.state(amountName)).toEqual(hugeValue);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn.mock.calls[0][0]).toEqual([]);


    // Set stored value to field amount
    wrapper.find(`[name="${amountName}"]`).simulate('change', {
      target: { value: storedValue, name: amountName },
    });

    expect(wrapper.state(amountName)).toEqual(storedValue);
    expect(mockFn.mock.calls[1][0]).toEqual(deals);
  });
});
