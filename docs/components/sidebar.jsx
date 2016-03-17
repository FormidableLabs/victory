import { components, routing as routingConfig } from "../config";
import { Link } from "react-router";
import React from "react";
import Radium from "radium";

import { VictorySettings } from "formidable-landers";

const RadiumLink = Radium(Link);

class Sidebar extends React.Component {

  getSidebarStyles() {
    return {
      base: {
        margin: 0,
        padding: "0 1rem 0 0",
        "@media (min-width: 70em)": {
          flex: "0 0 12em"
        }
      },
      list: {
        margin: "0",
        padding: "6px",
        listStyle: "none"
      },
      listItem: {
        marginTop: "0.3em",
        position: "relative",
        lineHeight: 1.4
      },
      nestedList: {
        margin: "0",
        padding: "0 0 0 1rem",
        listStyle: "none",
        fontSize: "0.9rem",
        color: VictorySettings.navy
      }
    };
  }

  getLinkStyles() {
    return {
      base: {
        boxShadow: "none",
        color: VictorySettings.darkSand,
        fontWeight: "normal",
        ":hover": {
          color: VictorySettings.red
        }
      },
      active: {
        boxShadow: "none",
        color: VictorySettings.red,
        fontWeight: "bold",
        ":hover": {
          color: VictorySettings.red
        }
      }
    };
  }

  generateListItems(items) {
    const styles = this.getSidebarStyles();
    const linkStyles = this.getLinkStyles();

    // Add "Getting started" link to sidebar
    // (must have `text` and `slug`)
    const sidebarList = [{
      text: "Getting started",
      slug: ""
    }].concat(items);

    return sidebarList.map((item) => {
      const isSelected = item.slug === this.props.active;

      const radiumLinkStyles = isSelected ?
        linkStyles.active :
        linkStyles.base;

      return (
        <li style={styles.listItem} key={item.slug}>
          <RadiumLink to={`docs/${item.slug}`} style={radiumLinkStyles}>
            {item.text}
          </RadiumLink>
        </li>
      );
    });
  }

  render() {
    const styles = this.getSidebarStyles();

    /* eslint-disable max-len */
    return (
      <nav
        className="Nav"
        style={styles.base}>
        <Link to={routingConfig.base} className="Link--unstyled">
          <img width="40px" height="40px" src={`${routingConfig.base}static/icon-victory.svg`} alt="Victory Homepage" />
        </Link>
        <ul style={styles.list}>
          {this.generateListItems(this.props.items)}
        </ul>
      </nav>
    );
  /* eslint-enable max-len */
  }
}
Sidebar.propTypes = {
  items: React.PropTypes.array,
  active: React.PropTypes.string
};

Sidebar.defaultProps = {
  items: components,
  active: null
};

export default Radium(Sidebar);
