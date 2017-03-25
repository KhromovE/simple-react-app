import React from 'react';
import Dashboard from '../../containers/Dashboard';

describe('Dashboard', () => {
  it('should render a component', () => {
    const div = document.createElement('div');
    const wrapper = shallow(
      <Dashboard>
        <div />
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
