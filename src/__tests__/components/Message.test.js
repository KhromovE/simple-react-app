import React from 'react';
import Message from '../../components/Message';

const header = 'Header';
const text = 'text';

describe('Message', () => {
  it('should render a component', () => {
    const wrapper = shallow(
      <Message header={header} text={text} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Message', () => {
  it('props should equal rendering values', () => {
    const header = 'Header';
    const text = 'text';

    const wrapper = mount(
      <Message header={header} text={text} />,
    );

    expect(wrapper.props().text).toEqual(text);
    expect(wrapper.props().header).toEqual(header);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('p').text()).toEqual(text);
  });
});
