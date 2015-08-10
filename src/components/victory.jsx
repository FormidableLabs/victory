import React from "react";
import {VictoryLine} from "victory-line";
import {VictoryPie} from "victory-pie"; // relies on animation
// import {VictoryScatter} from "victory-scatter"; // not yet published
// import {VictoryTree} from "victory-tree"; // needs republish
import {VictoryAnimation} from "victory-animation"; // needs republish
import {VictoryAxis} from "victory-axis";

class v extends React.Component {}
v.victoryLine = VictoryLine;
v.victoryPie = VictoryPie; // relies on animation
// v.victoryScatter = VictoryScatter; // not yet published
// v.victoryTree = VictoryTree; // needs republish
v.victoryAnimation = VictoryAnimation;
v.victoryAxis = VictoryAxis;

export default v;
