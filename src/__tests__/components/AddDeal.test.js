import React from 'react';

import AddDeal from '../../components/AddDeal';
import { noop, store } from '../../services/tests';

describe('AddDeal', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <AddDeal store={store} createDeal={noop} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  //
  // it('should change form fields', () => {
  //   const value = '33';
  //
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <AddDeal
  //         createDeal={noop}
  //       />
  //     </Provider>,
  //   );
  //
  //   wrapper.find('[id="amount"]').simulate('change', {
  //     target: { value },
  //   });
  //
  //   console.log(wrapper.children().props());
  //
  //   // expect(wrapper.state.model[value]).value.toEqual(value);
  // });
});
