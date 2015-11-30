import ga from "react-ga";
import React from "react";
import Radium, { Style } from "radium";

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

import BaseDocs from "./docs";

import theme from "./theme";

const docs = {
  'victory-bar': require('victory-bar/docs/docs'),
  'victory-line': require('victory-line/docs/docs'),
  'victory-scatter': require('victory-scatter/docs/docs')
};

@Radium
class ComponentDocs extends BaseDocs {

  componentWillMount() {
    ga.pageview(`/victory/docs/${this.props.params.component}`);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const Docs = docs[this.props.params.component];
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header/>
        <main style={this.getMainStyles()}>
          <Sidebar/>
          <section style={this.getDocsStyles()}>
            <Docs />
          </section>
        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    );
  }

}

export default ComponentDocs;
