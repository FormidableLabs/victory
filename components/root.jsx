import React from 'react';
import { Routehandler } from 'react-router';

import App from './app';

class Root extends React.Component {
  render() {
    return (
      <div>
        {this.props.children || <App />}
      </div>
    );
  }
};

export default Root;
