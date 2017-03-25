import React from 'react';
import { Provider } from 'react-redux';

import { AddDeal } from '../../components/AddDeal';
import { noop, store, deal } from '../../services/tests';

describe('AddDeal', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <AddDeal store={store} createDeal={noop} />,
    );

    expect(wrapper).toMatchSnapshot();
  });


  it('should execute mock function', () => {
    const mockFn = jest.fn();
    const options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired },
    };

    const wrapper = mount(
      <AddDeal
        store={store}
        createDeal={mockFn}
      />,
      options,
    );

    // set deal object to component state
    wrapper.setState({
      model: deal,
    });

    wrapper.find('[type="submit"]').get(0).click();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should set amount to state', () => {
    const smallValue = '1';
    const hugeValue = '1000';
    const amountName = 'amount';
    const options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired },
    };

    const wrapper = mount(
      <AddDeal
        store={store}
        createDeal={noop}
      />,
      options,
    );

    // Set huge value to field amount
    wrapper.find(`[name="${amountName}"]`).simulate('change', {
      target: { value: hugeValue, name: amountName },
    });

    expect(wrapper.state('model')[amountName]).toEqual(hugeValue);

    // Set small value to field amount
    wrapper.find(`[name="${amountName}"]`).simulate('change', {
      target: { value: smallValue, name: amountName },
    });

    expect(wrapper.state('model')[amountName]).toEqual(smallValue);
  });
});
