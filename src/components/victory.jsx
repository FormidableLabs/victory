import React from "react";
import {VictoryLine} from "victory-line";
// import {VictoryPie} from "victory-pie"; // needs update
import {VictoryScatter} from "victory-scatter";
import {VictoryBar} from "victory-bar";
import {VictoryChart} from "victory-chart"; // needs republish
import {VictoryAnimation} from "victory-animation"; // needs republish
import {VictoryAxis} from "victory-axis";

class v extends React.Component {}
v.victoryLine = VictoryLine;
// v.victoryPie = VictoryPie; // needs update
v.victoryScatter = VictoryScatter;
v.victoryBar = VictoryBar;
v.victoryChart = VictoryChart;
v.victoryAnimation = VictoryAnimation;
v.victoryAxis = VictoryAxis;

export default v;
