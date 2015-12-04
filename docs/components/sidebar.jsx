import { Link } from "react-router";
import React from "react";
import Radium from "radium";

import { VictorySettings } from "formidable-landers";

const RadiumLink = Radium(Link);

@Radium
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

    return items.map((item) => {
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
        <a href="/" className="Link--unstyled">
          <img width="40px" height="40px" src="/victory/static/icon-victory.svg" alt="Victory Homepage" />
        </a>
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

// For now, these sidebar items include only those components that have been updated
// with a fix to make their `docs.jsx` exportable--
// e.g., https://github.com/FormidableLabs/victory-pie/pull/22/files
//
// As additional components become available, just comment them back in!

Sidebar.defaultProps = {
  items: [
    { text: "Getting started", slug: "" },
    { text: "VictoryAxis", slug: "victory-axis" },
    { text: "VictoryBar", slug: "victory-bar" },
    { text: "VictoryChart", slug: "victory-chart" },
    { text: "VictoryLine", slug: "victory-line" },
    { text: "VictoryPie", slug: "victory-pie" },
    { text: "VictoryScatter", slug: "victory-scatter"}
  ],
  active: null
};

export default Sidebar;
