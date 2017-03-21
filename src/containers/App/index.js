import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import DevTools from '../DevTool';

const isProduction = process.env.NODE_ENV === 'production';

const App = (props) => {
  const { children } = props;
  return (
    <div>
      { children }
      {!isProduction && <DevTools />}
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;

