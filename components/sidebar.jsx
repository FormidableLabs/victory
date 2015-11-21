import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

class Sidebar extends React.Component {

  getSidebarStyles() {
    const navy = '#2b303b';
    const red = '#bd1e13';
    const darkSand = '#91887e';

    return {
      base: {
        margin: 0,
        padding: '0 1rem',
        '@media (min-width: 768px)': {
          flex: '0 0 12em'
        }
      },
      defaultList: {
        margin: '0',
        padding: '6px',
        listStyle: 'none'
      },
      defaultItem: {
        marginTop: '0.3em',
        position: 'relative',
        lineHeight: 1.4
      },
      openList: {
        margin: '0',
        padding: '0.25em 0.25em 0',
        fontSize: '0.9em',
        color: navy
      },
      selectedItem: {
        border: '1px solid red'
      },
      selectedLink: {
        color: red,
        fontWeight: 'bold'
      },
      link: {
        boxShadow: 'none',
        color: darkSand,
        fontWeight: 'normal'
        // ':hover': {
        //   color: '#000'
        // }
      }
    };
  }

  render() {
    const sidebarStyles = this.getSidebarStyles();

    return (
      <nav
        className="Nav"
        style={[sidebarStyles.base]}>
        <img width="40" src="/static/icon-victory.svg" />
        <ul style={[sidebarStyles.defaultList]}>
          <li style={[sidebarStyles.defaultItem]}>
            <a href="#" style={[sidebarStyles.link]}>Installation</a>
          </li>
          <li style={[sidebarStyles.selectedItem]}>
            <a href="#" style={[sidebarStyles.selectedLink]}>Story time</a>
            <ul style={[sidebarStyles.openList]}>
              <li style={[sidebarStyles.defaultItem]}>
                <a href="#" style={[sidebarStyles.selectedLink]}>Part I</a>
              </li>
              <li style={[sidebarStyles.defaultItem]}>
                <a href="#" style={[sidebarStyles.link]}>Part II</a>
              </li>
            </ul>
          </li>
          <li style={[sidebarStyles.defaultItem]}>
            <a href="#" style={[sidebarStyles.link]}>Victory Chart</a>
          </li>
          <li style={[sidebarStyles.defaultItem]}>
            <a href="#" style={[sidebarStyles.link]}>Victory Pie</a>
          </li>
          <li style={[sidebarStyles.defaultItem]}>
            <a href="#" style={[sidebarStyles.link]}>Victory Scatter</a>
          </li>
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
