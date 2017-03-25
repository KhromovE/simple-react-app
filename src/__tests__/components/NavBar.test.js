import React from 'react';
import NavBar from '../../components/NavBar';

import { store, fullStore } from '../../services/tests';

describe('NavBar', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <NavBar store={store} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a component without loader', () => {
    const wrapper = shallow(
      <NavBar store={fullStore} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should mount with loader', () => {
    const wrapper = mount(
      <NavBar store={store} />,
    );

    expect(wrapper.find('Loader')).toHaveLength(1);
  });

  it('should mount without loader', () => {
    const wrapper = mount(
      <NavBar store={fullStore} />,
    );

    expect(wrapper.find('Loader')).toHaveLength(0);
  });

  it('should update component', () => {
    const USDT_ETH = 42;
    const wrapper = mount(
      <NavBar store={fullStore} />,
    );

    wrapper.setProps({ USDT_ETH: USDT_ETH });
    expect(wrapper.props().USDT_ETH).toEqual(USDT_ETH);
  });
});
