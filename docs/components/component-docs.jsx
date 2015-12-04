import ga from "react-ga";
import React from "react";
import Radium, { Style } from "radium";
import { VictoryTheme, Header, Footer, VictorySidebar } from 'formidable-landers';
import BaseDocs from "./docs";

const docs = {
  "victory-axis": require("victory-axis/docs/docs"),
  "victory-chart": require("victory-chart/docs/docs"),
  "victory-pie": require("victory-pie/docs/docs"),
  "victory-bar": require("victory-bar/docs/docs"),
  "victory-line": require("victory-line/docs/docs"),
  "victory-scatter": require("victory-scatter/docs/docs")
};

@Radium
class ComponentDocs extends BaseDocs {

  componentWillMount() {
    ga.pageview(`/victory/docs/${this.props.params.component}`);
  }

  render() {
    const Docs = docs[this.props.params.component];
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header />
        <main style={this.getMainStyles()}>
          <VictorySidebar active={`/${this.props.params.component}`} />
          <section style={this.getDocsStyles()}>
            <Docs />
          </section>
        </main>
        <Footer/>
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

export default ComponentDocs;
