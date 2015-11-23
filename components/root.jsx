import React from 'react';
import { Routehandler } from 'react-router';

class Root extends React.Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default Root;
