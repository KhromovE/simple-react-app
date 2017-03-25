import React from 'react';

import DealsFilter from '../../components/DealsFilter';
import { noop, fullStore, store } from '../../services/tests';

import { Provider } from 'react-redux';

describe('AddDeal', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <DealsFilter
        store={store}
        deals={fullStore.getState().deal.deals}
        updateDealsList={noop}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  // it('should change component state', () => {
  //   const value = '33';
  //
  //   const wrapper = mount(
  //     <Provider store={fullStore}>
  //       <DealsFilter
  //         deals={store.getState().deal.deals}
  //         updateDealsList={noop}
  //       />
  //     </Provider>,
  //   );
  //
  //   wrapper.find('[name="amount"]').simulate('change', {
  //     target: {
  //       value,
  //     },
  //   });
  //
  //   console.log(wrapper.find('[name="amount"]').text());
  // });
});
