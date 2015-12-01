import React from "react";
import Radium from "radium";

@Radium
class Header extends React.Component {

  getHeaderStyles() {
    return {
      base: {
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "space-between",
        margin: 0,
        padding: "1rem 0.5rem",
        backgroundColor: "#ebe3db",
        textAlign: "center",
        borderBottom: "1px solid rgba(35, 31, 32, 0.02)"
      },
      styleOverrides: this.props.styleOverrides
    };
  }

  render() {
    const headerStyles = this.getHeaderStyles();
    return (
      <header
        style={[
          headerStyles.base,
          this.props.styleOverrides && headerStyles.styleOverrides
        ]}>
        <a href="mailto:hello@formidable.com" style={{margin: "0 auto", lineHeight: 1}}>
          Need React.js consulting? Let’s talk.
        </a>
      </header>
    );
  }
}

Header.propTypes = {
  styleOverrides: React.PropTypes.object
};

Header.defaultProps = {
  styleOverrides: null
};

export default Header;
