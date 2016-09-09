import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import App from "./app";
import AreaDocs from "./victory-area/docs";
import AxisDocs from "./victory-axis/docs";
import BarDocs from "./victory-bar/docs";
import ChartDocs from "./victory-chart/docs";
import LineDocs from "./victory-line/docs";
import ScatterDocs from "./victory-scatter/docs";
import CandlestickDocs from "./victory-candlestick/docs";
import ErrorBarDocs from "./victory-errorbar/docs";
import ThemeDocs from "./victory-theme/docs";
import GroupDocs from "./victory-group/docs";
import VoronoiDocs from "./victory-voronoi/docs";
import TooltipDocs from "./victory-tooltip/docs";

const content = document.getElementById("content");

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="area" component={AreaDocs}/>
      <Route path="axis" component={AxisDocs}/>
      <Route path="bar" component={BarDocs}/>
      <Route path="chart" component={ChartDocs}/>
      <Route path="line" component={LineDocs}/>
      <Route path="scatter" component={ScatterDocs}/>
      <Route path="candlestick" component={CandlestickDocs}/>
      <Route path="errorbar" component={ErrorBarDocs}/>
      <Route path="theme" component={ThemeDocs}/>
      <Route path="group" component={GroupDocs}/>
      <Route path="voronoi" component={VoronoiDocs}/>
      <Route path="tooltip" component={TooltipDocs}/>
    </Route>
  </Router>
), content);
