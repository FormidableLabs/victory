import _ from "underscore";
import ga from "react-ga";
import Radium, { Style } from "radium";
import React from "react";
import { VictorySettings, VictoryTheme, Header, Footer } from "formidable-landers";

import BaseDocs from "./docs";
import { components, headerText, routing as routingConfig } from "../config";
import Sidebar from "./sidebar";

class ComponentDocs extends BaseDocs {

  componentWillMount() {
    ga.pageview(`${routingConfig.base}docs/${this.props.params.component}`);
  }

  render() {
    const Docs = _.findWhere(components, { slug: this.props.params.component }).docs;
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header backgroundColor={VictorySettings.palestSand} styleOverrides={{display: "block"}}>
          {headerText}
        </Header>
        <main style={this.getMainStyles()}>
          <Sidebar active={`${this.props.params.component}`} />
          <section style={this.getDocsStyles()}>
            <Docs />
          </section>
        </main>
        <Footer backgroundColor="#ebe3db">
          <div style={{margin: "2em 0", fontSize: "0.8rem"}}>
            Victory is a trademark of Formidable Labs, Inc.
          </div>
        </Footer>
        <Style rules={VictoryTheme} />
      </div>
    );
  }

}

ComponentDocs.propTypes = {
  params: React.PropTypes.shape({
    component: React.PropTypes.string
  })
};

export default Radium(ComponentDocs);
