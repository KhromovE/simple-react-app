import React from 'react';
import App from '../../containers/App';

describe('App', () => {
  it('should render a component', () => {
    const div = document.createElement('div');
    const wrapper = shallow(
      <App>
        <div />
      </App>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
