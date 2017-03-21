import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

const MessageComponent = ({ header, text }) => (
  <div>
    <Message>
      <Message.Header>{header}</Message.Header>
      <p>{text}</p>
    </Message>
  </div>
);

MessageComponent.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MessageComponent;
