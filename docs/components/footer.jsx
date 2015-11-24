import React from "react";
import Radium from "radium";

@Radium
class Footer extends React.Component {

  getFooterStyles() {
    return {
      base: {
        listStyle: "none",
        margin: "1rem 0 0 0",
        padding: "3rem 0.5rem",
        backgroundColor: "#ebe3db",
        textAlign: "center",
        borderBottom: "1px solid rgba(35, 31, 32, 0.02)"
      },
      text: {
        display: "block"
      },
      styleOverrides: this.props.styleOverrides
    };
  }

  render() {
    const footerStyles = this.getFooterStyles();
    return (
      <footer
        style={[
          footerStyles.base,
          this.props.styleOverrides && footerStyles.styleOverrides
        ]}>
        <span style={[footerStyles.text]}>
          Made with love in Seattle by
        </span>
        <span style={[footerStyles.text]}>
          <a href="http://formidable.com/" style={{display: "block", boxShadow: "none"}}>
            <img width="300" src="static/logo-formidable-black.svg" alt="Formidable" />
          </a>
        </span>
        <span style={[footerStyles.text]}>
          P.S. <a href="http://formidable.com/studio/" style={{lineHeight: 1}}>We’re hiring</a>.
        </span>
      </footer>
    );
  }
}

Footer.propTypes = {
  styleOverrides: React.PropTypes.object
};

Footer.defaultProps = {
  styleOverrides: null
};

export default Footer;
