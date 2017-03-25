import React from 'react';

import GetUSD from '../../components/GetUSD';
import { noop, USDT_ETH, store } from '../../services/tests';

describe('GetUSD', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <GetUSD store={store} number={'33'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should return product of values', () => {
    const value = '33';
    const product = (value * USDT_ETH).toFixed(2);
    const resultString = `( $${product} )`;

    const wrapper = render(
      <GetUSD store={store} number={value} />,
    );

    expect(wrapper.text()).toEqual(resultString);
  });
});
