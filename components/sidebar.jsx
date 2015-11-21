import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

class Sidebar extends React.Component {

  getSidebarStyles() {
    return {
      base: {
        margin: 0,
        padding: '0 1rem',
        '@media (min-width: 768px)': {
          flex: '0 0 12em'
        }
      },
      styleOverrides: this.props.styleOverrides
    };
  }

  // .Copy ul > li {
  //   position: relative;
  // }
  //
  // .Copy ul > li + li {
  //   margin-top: 10px;
  // }
  //
  // .Copy ul > li:before {
  //   content: "";
  //   width: 1em;
  //   height: 1em;
  //   display: block;
  //   position: absolute;
  //   font-size: 8px;
  //   border-radius: 50%;
  //   border: 1px solid #B22D26;
  //   left: -24px;
  //   top: 11px;
  // }
  //
  // .Copy li > ul {
  //   margin-top: 10px;
  //   margin-bottom: 0;
  // }
  getTableOfContentsStyles() {
    return {
      margin: '0',
      paddingLeft: '24px',
      listStyle: 'none'
    };
  }

  render() {
    const sidebarStyles = this.getSidebarStyles();
    return (
      <nav
        style={[
          sidebarStyles.base,
          this.props.styleOverrides && styles.styleOverrides
        ]}>
        <ul style={this.getTableOfContentsStyles()}>
          <li>Installation</li>
          <li>Victory Chart</li>
          <li>Victory Pie</li>
          <li>Victory Scatter</li>
        </ul>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  styleOverrides: React.PropTypes.object
};

Sidebar.defaultProps = {
  styleOverrides: null
};

export default Radium(Sidebar);
