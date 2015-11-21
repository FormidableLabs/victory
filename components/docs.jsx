import React from 'react';

class Docs extends React.Component {
  render () {
    return (
      <div>
      <p>DOX LIVE HERE</p>
      <div>
        {this.props.children}
      </div>
      </div>
    );
  }
};

export default Docs;
