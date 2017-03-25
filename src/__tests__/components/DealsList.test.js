import React from 'react';
import { Provider } from 'react-redux';

import DealsList from '../../components/DealsList';
import { store, fullStore, noop } from '../../services/tests';

describe('DealsList', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <DealsList store={store} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should mount component without deals', () => {
    const wrapper = mount(
      <DealsList
        store={store}
        removeDeal={noop}
      />,
    );

    expect(wrapper.find('Message')).toHaveLength(1);
  });

  it('should mount component with deals', () => {
    const wrapper = mount(
      <Provider store={fullStore}>
        <DealsList
          removeDeal={noop}
        />
      </Provider>,
    );

    expect(wrapper.find('Message')).toHaveLength(0);
    expect(wrapper.find('Table')).toHaveLength(1);
  });
});
