/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryHistogram } from "../packages/victory-histogram/src";
import { VictoryLine } from "../packages/victory-line/src";
import { VictoryScatter } from "../packages/victory-scatter/src";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";

import { VictoryTheme } from "../packages/victory-core/src";
import { getChartDecorator } from "./decorators";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3Time from "d3-time";

const data = [
  { x: 18 },
  { x: 85 },
  { x: 27 },
  { x: 62 },
  { x: 26 },
  { x: 90 },
  { x: 85 },
  { x: 60 },
  { x: 85 },
  { x: 21 },
  { x: 86 },
  { x: 89 },
  { x: 60 },
  { x: 82 },
  { x: 70 },
  { x: 22 },
  { x: 68 },
  { x: 79 },
  { x: 18 },
  { x: 76 },
  { x: 32 },
  { x: 26 },
  { x: 18 },
  { x: 63 },
  { x: 71 },
  { x: 98 },
  { x: 91 },
  { x: 22 },
  { x: 25 },
  { x: 91 },
  { x: 18 },
  { x: 49 },
  { x: 18 },
  { x: 79 },
  { x: 56 },
  { x: 18 },
  { x: 18 },
  { x: 28 },
  { x: 79 },
  { x: 44 }
];

const timeData = [
  { x: new Date("2018-09-24T07:00:00.000Z") },
  { x: new Date("2010-09-14T07:00:00.000Z") },
  { x: new Date("2011-03-14T07:00:00.000Z") },
  { x: new Date("2011-01-09T08:00:00.000Z") },
  { x: new Date("2014-05-06T07:00:00.000Z") },
  { x: new Date("2012-02-05T08:00:00.000Z") },
  { x: new Date("2013-08-09T07:00:00.000Z") },
  { x: new Date("2015-05-21T07:00:00.000Z") },
  { x: new Date("2020-11-10T08:00:00.000Z") },
  { x: new Date("2013-01-27T08:00:00.000Z") },
  { x: new Date("2013-03-03T08:00:00.000Z") },
  { x: new Date("2015-10-21T07:00:00.000Z") },
  { x: new Date("2021-09-10T07:00:00.000Z") },
  { x: new Date("2011-01-05T08:00:00.000Z") },
  { x: new Date("2020-03-18T07:00:00.000Z") },
  { x: new Date("2011-02-04T08:00:00.000Z") },
  { x: new Date("2019-03-19T07:00:00.000Z") },
  { x: new Date("2019-01-03T08:00:00.000Z") },
  { x: new Date("2016-07-07T07:00:00.000Z") },
  { x: new Date("2011-05-18T07:00:00.000Z") },
  { x: new Date("2021-06-12T07:00:00.000Z") },
  { x: new Date("2016-09-12T07:00:00.000Z") },
  { x: new Date("2018-02-24T08:00:00.000Z") },
  { x: new Date("2016-01-05T08:00:00.000Z") },
  { x: new Date("2019-08-07T07:00:00.000Z") },
  { x: new Date("2018-05-19T07:00:00.000Z") },
  { x: new Date("2020-06-25T07:00:00.000Z") },
  { x: new Date("2018-09-17T07:00:00.000Z") },
  { x: new Date("2012-04-27T07:00:00.000Z") },
  { x: new Date("2016-01-18T08:00:00.000Z") },
  { x: new Date("2020-01-07T08:00:00.000Z") },
  { x: new Date("2017-09-24T07:00:00.000Z") },
  { x: new Date("2014-09-19T07:00:00.000Z") },
  { x: new Date("2021-09-11T07:00:00.000Z") },
  { x: new Date("2013-06-10T07:00:00.000Z") },
  { x: new Date("2020-08-18T07:00:00.000Z") },
  { x: new Date("2015-06-16T07:00:00.000Z") },
  { x: new Date("2021-07-26T07:00:00.000Z") },
  { x: new Date("2014-02-10T08:00:00.000Z") },
  { x: new Date("2020-07-13T07:00:00.000Z") },
  { x: new Date("2021-07-06T07:00:00.000Z") },
  { x: new Date("2012-08-06T07:00:00.000Z") },
  { x: new Date("2013-11-14T08:00:00.000Z") },
  { x: new Date("2011-07-01T07:00:00.000Z") },
  { x: new Date("2017-08-12T07:00:00.000Z") },
  { x: new Date("2014-08-12T07:00:00.000Z") },
  { x: new Date("2015-05-20T07:00:00.000Z") },
  { x: new Date("2010-09-16T07:00:00.000Z") },
  { x: new Date("2013-09-21T07:00:00.000Z") },
  { x: new Date("2012-05-19T07:00:00.000Z") },
  { x: new Date("2010-06-25T07:00:00.000Z") },
  { x: new Date("2014-02-25T08:00:00.000Z") },
  { x: new Date("2012-10-14T07:00:00.000Z") },
  { x: new Date("2014-03-10T07:00:00.000Z") },
  { x: new Date("2010-06-17T07:00:00.000Z") },
  { x: new Date("2010-11-19T08:00:00.000Z") },
  { x: new Date("2016-11-14T08:00:00.000Z") },
  { x: new Date("2020-03-20T07:00:00.000Z") },
  { x: new Date("2016-05-21T07:00:00.000Z") },
  { x: new Date("2018-03-16T07:00:00.000Z") },
  { x: new Date("2017-07-15T07:00:00.000Z") },
  { x: new Date("2018-01-11T08:00:00.000Z") },
  { x: new Date("2010-01-01T08:00:00.000Z") },
  { x: new Date("2014-10-13T07:00:00.000Z") },
  { x: new Date("2013-10-08T07:00:00.000Z") },
  { x: new Date("2020-03-01T08:00:00.000Z") },
  { x: new Date("2018-09-14T07:00:00.000Z") },
  { x: new Date("2021-02-17T08:00:00.000Z") },
  { x: new Date("2020-08-08T07:00:00.000Z") },
  { x: new Date("2019-04-09T07:00:00.000Z") },
  { x: new Date("2011-01-05T08:00:00.000Z") },
  { x: new Date("2013-02-26T08:00:00.000Z") },
  { x: new Date("2020-03-04T08:00:00.000Z") },
  { x: new Date("2018-08-04T07:00:00.000Z") },
  { x: new Date("2011-09-14T07:00:00.000Z") },
  { x: new Date("2018-02-19T08:00:00.000Z") },
  { x: new Date("2016-02-08T08:00:00.000Z") },
  { x: new Date("2020-10-03T07:00:00.000Z") },
  { x: new Date("2021-05-24T07:00:00.000Z") },
  { x: new Date("2019-10-04T07:00:00.000Z") },
  { x: new Date("2019-09-21T07:00:00.000Z") },
  { x: new Date("2020-06-20T07:00:00.000Z") },
  { x: new Date("2017-10-10T07:00:00.000Z") },
  { x: new Date("2017-09-16T07:00:00.000Z") },
  { x: new Date("2010-05-20T07:00:00.000Z") },
  { x: new Date("2020-04-05T07:00:00.000Z") },
  { x: new Date("2021-01-07T08:00:00.000Z") },
  { x: new Date("2012-09-05T07:00:00.000Z") },
  { x: new Date("2010-06-11T07:00:00.000Z") },
  { x: new Date("2010-01-15T08:00:00.000Z") },
  { x: new Date("2015-06-23T07:00:00.000Z") },
  { x: new Date("2016-05-07T07:00:00.000Z") },
  { x: new Date("2012-06-25T07:00:00.000Z") },
  { x: new Date("2016-05-03T07:00:00.000Z") },
  { x: new Date("2011-10-12T07:00:00.000Z") },
  { x: new Date("2019-01-23T08:00:00.000Z") },
  { x: new Date("2013-01-15T08:00:00.000Z") },
  { x: new Date("2018-02-05T08:00:00.000Z") },
  { x: new Date("2011-07-24T07:00:00.000Z") },
  { x: new Date("2010-11-14T08:00:00.000Z") },
  { x: new Date("2020-10-16T07:00:00.000Z") },
  { x: new Date("2016-03-07T08:00:00.000Z") },
  { x: new Date("2014-02-12T08:00:00.000Z") },
  { x: new Date("2019-11-20T08:00:00.000Z") },
  { x: new Date("2019-09-27T07:00:00.000Z") },
  { x: new Date("2019-03-16T07:00:00.000Z") },
  { x: new Date("2018-08-15T07:00:00.000Z") },
  { x: new Date("2020-02-21T08:00:00.000Z") },
  { x: new Date("2012-05-03T07:00:00.000Z") },
  { x: new Date("2015-03-23T07:00:00.000Z") },
  { x: new Date("2021-06-27T07:00:00.000Z") },
  { x: new Date("2015-03-16T07:00:00.000Z") },
  { x: new Date("2014-05-04T07:00:00.000Z") },
  { x: new Date("2020-03-08T08:00:00.000Z") },
  { x: new Date("2021-07-11T07:00:00.000Z") },
  { x: new Date("2010-08-15T07:00:00.000Z") },
  { x: new Date("2016-10-09T07:00:00.000Z") },
  { x: new Date("2012-07-13T07:00:00.000Z") },
  { x: new Date("2020-07-22T07:00:00.000Z") },
  { x: new Date("2019-08-22T07:00:00.000Z") },
  { x: new Date("2014-03-05T08:00:00.000Z") },
  { x: new Date("2014-03-05T08:00:00.000Z") },
  { x: new Date("2021-09-05T07:00:00.000Z") },
  { x: new Date("2021-02-11T08:00:00.000Z") },
  { x: new Date("2018-11-07T08:00:00.000Z") },
  { x: new Date("2017-10-25T07:00:00.000Z") },
  { x: new Date("2018-03-07T08:00:00.000Z") },
  { x: new Date("2012-10-17T07:00:00.000Z") },
  { x: new Date("2021-03-27T07:00:00.000Z") },
  { x: new Date("2017-01-01T08:00:00.000Z") },
  { x: new Date("2010-03-21T07:00:00.000Z") },
  { x: new Date("2021-07-23T07:00:00.000Z") },
  { x: new Date("2015-11-26T08:00:00.000Z") },
  { x: new Date("2021-02-20T08:00:00.000Z") },
  { x: new Date("2018-09-18T07:00:00.000Z") },
  { x: new Date("2018-09-27T07:00:00.000Z") },
  { x: new Date("2021-05-24T07:00:00.000Z") },
  { x: new Date("2019-05-02T07:00:00.000Z") },
  { x: new Date("2018-06-12T07:00:00.000Z") },
  { x: new Date("2016-05-13T07:00:00.000Z") },
  { x: new Date("2020-07-22T07:00:00.000Z") },
  { x: new Date("2017-04-19T07:00:00.000Z") },
  { x: new Date("2010-10-14T07:00:00.000Z") },
  { x: new Date("2021-11-01T07:00:00.000Z") },
  { x: new Date("2015-09-03T07:00:00.000Z") },
  { x: new Date("2015-01-18T08:00:00.000Z") },
  { x: new Date("2020-05-22T07:00:00.000Z") },
  { x: new Date("2020-05-21T07:00:00.000Z") },
  { x: new Date("2017-01-09T08:00:00.000Z") },
  { x: new Date("2017-01-01T08:00:00.000Z") },
  { x: new Date("2020-05-13T07:00:00.000Z") },
  { x: new Date("2013-01-24T08:00:00.000Z") },
  { x: new Date("2013-04-05T07:00:00.000Z") },
  { x: new Date("2018-04-15T07:00:00.000Z") },
  { x: new Date("2014-02-11T08:00:00.000Z") },
  { x: new Date("2014-11-21T08:00:00.000Z") },
  { x: new Date("2017-10-12T07:00:00.000Z") },
  { x: new Date("2020-06-15T07:00:00.000Z") },
  { x: new Date("2015-01-20T08:00:00.000Z") },
  { x: new Date("2021-08-26T07:00:00.000Z") },
  { x: new Date("2010-10-20T07:00:00.000Z") },
  { x: new Date("2012-09-02T07:00:00.000Z") },
  { x: new Date("2018-09-20T07:00:00.000Z") },
  { x: new Date("2015-04-01T07:00:00.000Z") },
  { x: new Date("2012-02-22T08:00:00.000Z") },
  { x: new Date("2017-03-03T08:00:00.000Z") },
  { x: new Date("2011-06-08T07:00:00.000Z") },
  { x: new Date("2015-08-11T07:00:00.000Z") },
  { x: new Date("2010-01-10T08:00:00.000Z") },
  { x: new Date("2019-05-18T07:00:00.000Z") },
  { x: new Date("2020-09-03T07:00:00.000Z") },
  { x: new Date("2011-09-04T07:00:00.000Z") },
  { x: new Date("2017-10-01T07:00:00.000Z") },
  { x: new Date("2010-07-02T07:00:00.000Z") },
  { x: new Date("2010-05-15T07:00:00.000Z") },
  { x: new Date("2021-08-23T07:00:00.000Z") },
  { x: new Date("2018-05-19T07:00:00.000Z") },
  { x: new Date("2015-11-21T08:00:00.000Z") },
  { x: new Date("2014-11-15T08:00:00.000Z") },
  { x: new Date("2014-06-10T07:00:00.000Z") },
  { x: new Date("2013-11-21T08:00:00.000Z") },
  { x: new Date("2021-04-06T07:00:00.000Z") },
  { x: new Date("2014-03-26T07:00:00.000Z") },
  { x: new Date("2020-05-07T07:00:00.000Z") },
  { x: new Date("2016-06-03T07:00:00.000Z") },
  { x: new Date("2018-04-07T07:00:00.000Z") },
  { x: new Date("2020-04-14T07:00:00.000Z") },
  { x: new Date("2010-07-27T07:00:00.000Z") },
  { x: new Date("2020-03-03T08:00:00.000Z") },
  { x: new Date("2012-02-24T08:00:00.000Z") },
  { x: new Date("2018-06-10T07:00:00.000Z") },
  { x: new Date("2010-05-16T07:00:00.000Z") },
  { x: new Date("2017-09-15T07:00:00.000Z") },
  { x: new Date("2017-11-16T08:00:00.000Z") },
  { x: new Date("2013-04-03T07:00:00.000Z") },
  { x: new Date("2013-04-05T07:00:00.000Z") },
  { x: new Date("2012-07-21T07:00:00.000Z") },
  { x: new Date("2020-03-09T07:00:00.000Z") },
  { x: new Date("2019-11-07T08:00:00.000Z") },
  { x: new Date("2017-07-17T07:00:00.000Z") },
  { x: new Date("2011-03-02T08:00:00.000Z") },
  { x: new Date("2012-11-05T08:00:00.000Z") },
  { x: new Date("2020-03-12T07:00:00.000Z") },
  { x: new Date("2021-08-27T07:00:00.000Z") },
  { x: new Date("2013-04-04T07:00:00.000Z") },
  { x: new Date("2013-09-24T07:00:00.000Z") },
  { x: new Date("2021-08-08T07:00:00.000Z") },
  { x: new Date("2020-11-24T08:00:00.000Z") },
  { x: new Date("2018-07-13T07:00:00.000Z") },
  { x: new Date("2010-05-17T07:00:00.000Z") },
  { x: new Date("2020-09-06T07:00:00.000Z") },
  { x: new Date("2020-08-13T07:00:00.000Z") },
  { x: new Date("2015-05-22T07:00:00.000Z") },
  { x: new Date("2015-11-22T08:00:00.000Z") },
  { x: new Date("2011-07-26T07:00:00.000Z") },
  { x: new Date("2017-10-20T07:00:00.000Z") },
  { x: new Date("2010-01-18T08:00:00.000Z") },
  { x: new Date("2018-02-21T08:00:00.000Z") },
  { x: new Date("2018-09-26T07:00:00.000Z") },
  { x: new Date("2016-03-14T07:00:00.000Z") },
  { x: new Date("2011-07-08T07:00:00.000Z") },
  { x: new Date("2015-06-18T07:00:00.000Z") },
  { x: new Date("2017-03-19T07:00:00.000Z") },
  { x: new Date("2019-06-12T07:00:00.000Z") },
  { x: new Date("2021-05-08T07:00:00.000Z") },
  { x: new Date("2010-07-23T07:00:00.000Z") },
  { x: new Date("2017-11-12T08:00:00.000Z") },
  { x: new Date("2021-04-19T07:00:00.000Z") },
  { x: new Date("2013-07-22T07:00:00.000Z") },
  { x: new Date("2012-02-26T08:00:00.000Z") },
  { x: new Date("2019-10-08T07:00:00.000Z") },
  { x: new Date("2010-11-13T08:00:00.000Z") },
  { x: new Date("2016-02-09T08:00:00.000Z") },
  { x: new Date("2020-09-19T07:00:00.000Z") },
  { x: new Date("2020-06-11T07:00:00.000Z") },
  { x: new Date("2021-05-12T07:00:00.000Z") },
  { x: new Date("2013-03-26T07:00:00.000Z") },
  { x: new Date("2015-11-12T08:00:00.000Z") },
  { x: new Date("2016-03-15T07:00:00.000Z") },
  { x: new Date("2021-04-09T07:00:00.000Z") },
  { x: new Date("2010-07-26T07:00:00.000Z") },
  { x: new Date("2021-01-11T08:00:00.000Z") },
  { x: new Date("2017-04-22T07:00:00.000Z") },
  { x: new Date("2019-01-13T08:00:00.000Z") },
  { x: new Date("2020-06-08T07:00:00.000Z") },
  { x: new Date("2013-03-08T08:00:00.000Z") },
  { x: new Date("2012-10-19T07:00:00.000Z") },
  { x: new Date("2018-06-12T07:00:00.000Z") },
  { x: new Date("2021-01-27T08:00:00.000Z") },
  { x: new Date("2010-06-23T07:00:00.000Z") },
  { x: new Date("2013-07-06T07:00:00.000Z") },
  { x: new Date("2014-09-09T07:00:00.000Z") },
  { x: new Date("2012-06-17T07:00:00.000Z") },
  { x: new Date("2013-05-24T07:00:00.000Z") },
  { x: new Date("2011-03-10T08:00:00.000Z") },
  { x: new Date("2021-05-27T07:00:00.000Z") },
  { x: new Date("2017-11-06T08:00:00.000Z") },
  { x: new Date("2019-10-21T07:00:00.000Z") },
  { x: new Date("2014-09-20T07:00:00.000Z") },
  { x: new Date("2018-02-17T08:00:00.000Z") },
  { x: new Date("2019-02-09T08:00:00.000Z") },
  { x: new Date("2015-04-11T07:00:00.000Z") },
  { x: new Date("2021-08-16T07:00:00.000Z") },
  { x: new Date("2011-10-11T07:00:00.000Z") },
  { x: new Date("2010-01-13T08:00:00.000Z") },
  { x: new Date("2021-01-19T08:00:00.000Z") },
  { x: new Date("2016-11-12T08:00:00.000Z") },
  { x: new Date("2011-08-25T07:00:00.000Z") },
  { x: new Date("2012-02-09T08:00:00.000Z") },
  { x: new Date("2016-01-08T08:00:00.000Z") },
  { x: new Date("2016-01-01T08:00:00.000Z") },
  { x: new Date("2017-09-15T07:00:00.000Z") },
  { x: new Date("2012-05-08T07:00:00.000Z") },
  { x: new Date("2016-06-12T07:00:00.000Z") },
  { x: new Date("2019-06-26T07:00:00.000Z") },
  { x: new Date("2011-09-24T07:00:00.000Z") },
  { x: new Date("2020-07-07T07:00:00.000Z") },
  { x: new Date("2013-08-04T07:00:00.000Z") },
  { x: new Date("2020-10-14T07:00:00.000Z") },
  { x: new Date("2021-02-13T08:00:00.000Z") },
  { x: new Date("2021-03-13T08:00:00.000Z") },
  { x: new Date("2020-07-15T07:00:00.000Z") },
  { x: new Date("2011-05-27T07:00:00.000Z") },
  { x: new Date("2020-10-05T07:00:00.000Z") },
  { x: new Date("2021-03-01T08:00:00.000Z") },
  { x: new Date("2012-10-24T07:00:00.000Z") },
  { x: new Date("2020-07-11T07:00:00.000Z") },
  { x: new Date("2011-07-25T07:00:00.000Z") },
  { x: new Date("2021-08-20T07:00:00.000Z") },
  { x: new Date("2016-11-07T08:00:00.000Z") },
  { x: new Date("2016-01-11T08:00:00.000Z") },
  { x: new Date("2018-08-02T07:00:00.000Z") },
  { x: new Date("2011-07-13T07:00:00.000Z") },
  { x: new Date("2013-07-10T07:00:00.000Z") },
  { x: new Date("2010-10-23T07:00:00.000Z") },
  { x: new Date("2015-03-06T08:00:00.000Z") },
  { x: new Date("2012-01-18T08:00:00.000Z") },
  { x: new Date("2013-11-02T07:00:00.000Z") },
  { x: new Date("2017-09-17T07:00:00.000Z") },
  { x: new Date("2019-02-17T08:00:00.000Z") },
  { x: new Date("2019-09-01T07:00:00.000Z") },
  { x: new Date("2013-01-16T08:00:00.000Z") },
  { x: new Date("2012-09-08T07:00:00.000Z") },
  { x: new Date("2021-02-24T08:00:00.000Z") },
  { x: new Date("2019-05-22T07:00:00.000Z") },
  { x: new Date("2010-06-07T07:00:00.000Z") },
  { x: new Date("2013-04-21T07:00:00.000Z") },
  { x: new Date("2021-06-22T07:00:00.000Z") },
  { x: new Date("2015-03-11T07:00:00.000Z") },
  { x: new Date("2019-01-01T08:00:00.000Z") },
  { x: new Date("2015-03-03T08:00:00.000Z") },
  { x: new Date("2014-08-02T07:00:00.000Z") },
  { x: new Date("2012-11-05T08:00:00.000Z") },
  { x: new Date("2018-06-03T07:00:00.000Z") },
  { x: new Date("2017-02-20T08:00:00.000Z") },
  { x: new Date("2010-04-25T07:00:00.000Z") },
  { x: new Date("2011-11-25T08:00:00.000Z") },
  { x: new Date("2020-08-19T07:00:00.000Z") },
  { x: new Date("2016-01-24T08:00:00.000Z") },
  { x: new Date("2019-02-14T08:00:00.000Z") },
  { x: new Date("2020-06-02T07:00:00.000Z") },
  { x: new Date("2015-11-01T07:00:00.000Z") },
  { x: new Date("2016-09-01T07:00:00.000Z") },
  { x: new Date("2016-02-08T08:00:00.000Z") },
  { x: new Date("2011-11-20T08:00:00.000Z") },
  { x: new Date("2021-04-25T07:00:00.000Z") },
  { x: new Date("2010-01-05T08:00:00.000Z") },
  { x: new Date("2015-07-25T07:00:00.000Z") },
  { x: new Date("2017-10-07T07:00:00.000Z") },
  { x: new Date("2019-07-11T07:00:00.000Z") },
  { x: new Date("2017-02-23T08:00:00.000Z") },
  { x: new Date("2011-05-12T07:00:00.000Z") },
  { x: new Date("2013-03-01T08:00:00.000Z") },
  { x: new Date("2015-06-02T07:00:00.000Z") },
  { x: new Date("2015-07-21T07:00:00.000Z") },
  { x: new Date("2017-06-23T07:00:00.000Z") },
  { x: new Date("2021-08-13T07:00:00.000Z") },
  { x: new Date("2016-01-04T08:00:00.000Z") },
  { x: new Date("2010-06-08T07:00:00.000Z") },
  { x: new Date("2019-08-11T07:00:00.000Z") },
  { x: new Date("2011-03-15T07:00:00.000Z") },
  { x: new Date("2016-11-26T08:00:00.000Z") },
  { x: new Date("2014-07-24T07:00:00.000Z") },
  { x: new Date("2013-03-10T08:00:00.000Z") },
  { x: new Date("2011-01-16T08:00:00.000Z") },
  { x: new Date("2017-02-27T08:00:00.000Z") },
  { x: new Date("2010-02-24T08:00:00.000Z") },
  { x: new Date("2011-03-22T07:00:00.000Z") },
  { x: new Date("2012-06-15T07:00:00.000Z") },
  { x: new Date("2014-02-10T08:00:00.000Z") },
  { x: new Date("2012-11-22T08:00:00.000Z") },
  { x: new Date("2019-09-19T07:00:00.000Z") },
  { x: new Date("2011-02-18T08:00:00.000Z") },
  { x: new Date("2021-01-08T08:00:00.000Z") },
  { x: new Date("2013-11-08T08:00:00.000Z") },
  { x: new Date("2020-08-01T07:00:00.000Z") },
  { x: new Date("2019-04-20T07:00:00.000Z") },
  { x: new Date("2016-03-18T07:00:00.000Z") },
  { x: new Date("2020-05-22T07:00:00.000Z") },
  { x: new Date("2018-07-20T07:00:00.000Z") },
  { x: new Date("2021-06-07T07:00:00.000Z") },
  { x: new Date("2012-07-24T07:00:00.000Z") },
  { x: new Date("2010-09-20T07:00:00.000Z") },
  { x: new Date("2016-11-10T08:00:00.000Z") },
  { x: new Date("2014-09-07T07:00:00.000Z") },
  { x: new Date("2011-01-16T08:00:00.000Z") },
  { x: new Date("2013-11-04T08:00:00.000Z") },
  { x: new Date("2015-04-07T07:00:00.000Z") },
  { x: new Date("2018-02-14T08:00:00.000Z") },
  { x: new Date("2016-05-13T07:00:00.000Z") },
  { x: new Date("2013-03-02T08:00:00.000Z") },
  { x: new Date("2020-05-03T07:00:00.000Z") },
  { x: new Date("2010-11-07T07:00:00.000Z") },
  { x: new Date("2012-02-25T08:00:00.000Z") },
  { x: new Date("2016-03-04T08:00:00.000Z") },
  { x: new Date("2016-08-19T07:00:00.000Z") },
  { x: new Date("2012-11-24T08:00:00.000Z") },
  { x: new Date("2015-01-10T08:00:00.000Z") },
  { x: new Date("2016-11-02T07:00:00.000Z") },
  { x: new Date("2012-09-03T07:00:00.000Z") },
  { x: new Date("2016-07-02T07:00:00.000Z") },
  { x: new Date("2018-07-22T07:00:00.000Z") },
  { x: new Date("2021-01-04T08:00:00.000Z") },
  { x: new Date("2013-06-06T07:00:00.000Z") },
  { x: new Date("2020-02-04T08:00:00.000Z") },
  { x: new Date("2013-04-26T07:00:00.000Z") },
  { x: new Date("2015-06-24T07:00:00.000Z") },
  { x: new Date("2012-05-20T07:00:00.000Z") },
  { x: new Date("2018-07-14T07:00:00.000Z") },
  { x: new Date("2010-05-07T07:00:00.000Z") },
  { x: new Date("2010-10-11T07:00:00.000Z") },
  { x: new Date("2014-05-05T07:00:00.000Z") },
  { x: new Date("2021-05-08T07:00:00.000Z") },
  { x: new Date("2012-04-05T07:00:00.000Z") },
  { x: new Date("2012-02-23T08:00:00.000Z") },
  { x: new Date("2012-09-05T07:00:00.000Z") },
  { x: new Date("2012-05-22T07:00:00.000Z") },
  { x: new Date("2011-09-05T07:00:00.000Z") },
  { x: new Date("2017-08-19T07:00:00.000Z") },
  { x: new Date("2011-08-16T07:00:00.000Z") },
  { x: new Date("2010-06-15T07:00:00.000Z") },
  { x: new Date("2018-09-26T07:00:00.000Z") },
  { x: new Date("2015-11-18T08:00:00.000Z") },
  { x: new Date("2020-01-23T08:00:00.000Z") },
  { x: new Date("2016-04-08T07:00:00.000Z") },
  { x: new Date("2016-11-24T08:00:00.000Z") },
  { x: new Date("2016-10-10T07:00:00.000Z") },
  { x: new Date("2019-01-18T08:00:00.000Z") },
  { x: new Date("2018-09-11T07:00:00.000Z") },
  { x: new Date("2013-10-09T07:00:00.000Z") },
  { x: new Date("2014-06-12T07:00:00.000Z") },
  { x: new Date("2010-07-17T07:00:00.000Z") },
  { x: new Date("2021-09-15T07:00:00.000Z") },
  { x: new Date("2010-06-16T07:00:00.000Z") },
  { x: new Date("2016-04-27T07:00:00.000Z") },
  { x: new Date("2014-06-17T07:00:00.000Z") },
  { x: new Date("2012-09-03T07:00:00.000Z") },
  { x: new Date("2017-11-10T08:00:00.000Z") },
  { x: new Date("2021-10-20T07:00:00.000Z") },
  { x: new Date("2011-02-19T08:00:00.000Z") },
  { x: new Date("2018-07-02T07:00:00.000Z") },
  { x: new Date("2017-03-14T07:00:00.000Z") },
  { x: new Date("2020-07-07T07:00:00.000Z") },
  { x: new Date("2017-09-09T07:00:00.000Z") },
  { x: new Date("2021-10-19T07:00:00.000Z") },
  { x: new Date("2017-02-03T08:00:00.000Z") },
  { x: new Date("2015-07-05T07:00:00.000Z") },
  { x: new Date("2012-11-27T08:00:00.000Z") },
  { x: new Date("2021-06-03T07:00:00.000Z") },
  { x: new Date("2010-01-23T08:00:00.000Z") },
  { x: new Date("2021-05-23T07:00:00.000Z") },
  { x: new Date("2015-05-12T07:00:00.000Z") },
  { x: new Date("2018-03-03T08:00:00.000Z") },
  { x: new Date("2021-05-07T07:00:00.000Z") },
  { x: new Date("2012-06-22T07:00:00.000Z") },
  { x: new Date("2019-03-03T08:00:00.000Z") },
  { x: new Date("2014-10-03T07:00:00.000Z") },
  { x: new Date("2014-04-02T07:00:00.000Z") },
  { x: new Date("2020-11-04T08:00:00.000Z") },
  { x: new Date("2012-02-16T08:00:00.000Z") },
  { x: new Date("2014-02-18T08:00:00.000Z") },
  { x: new Date("2011-07-25T07:00:00.000Z") },
  { x: new Date("2020-01-11T08:00:00.000Z") },
  { x: new Date("2013-01-13T08:00:00.000Z") },
  { x: new Date("2012-04-06T07:00:00.000Z") },
  { x: new Date("2021-10-22T07:00:00.000Z") },
  { x: new Date("2013-05-04T07:00:00.000Z") },
  { x: new Date("2011-03-14T07:00:00.000Z") },
  { x: new Date("2016-10-07T07:00:00.000Z") },
  { x: new Date("2013-04-23T07:00:00.000Z") },
  { x: new Date("2013-07-05T07:00:00.000Z") },
  { x: new Date("2014-03-09T08:00:00.000Z") },
  { x: new Date("2011-09-24T07:00:00.000Z") },
  { x: new Date("2019-10-02T07:00:00.000Z") },
  { x: new Date("2013-08-27T07:00:00.000Z") },
  { x: new Date("2011-11-16T08:00:00.000Z") },
  { x: new Date("2018-09-14T07:00:00.000Z") },
  { x: new Date("2018-05-08T07:00:00.000Z") },
  { x: new Date("2014-03-08T08:00:00.000Z") },
  { x: new Date("2011-09-05T07:00:00.000Z") },
  { x: new Date("2021-07-10T07:00:00.000Z") },
  { x: new Date("2012-04-26T07:00:00.000Z") },
  { x: new Date("2015-03-10T07:00:00.000Z") },
  { x: new Date("2017-06-25T07:00:00.000Z") },
  { x: new Date("2012-06-06T07:00:00.000Z") },
  { x: new Date("2016-03-17T07:00:00.000Z") },
  { x: new Date("2019-10-13T07:00:00.000Z") },
  { x: new Date("2017-04-08T07:00:00.000Z") },
  { x: new Date("2019-09-03T07:00:00.000Z") },
  { x: new Date("2013-02-09T08:00:00.000Z") },
  { x: new Date("2011-11-07T08:00:00.000Z") },
  { x: new Date("2021-07-07T07:00:00.000Z") },
  { x: new Date("2013-03-15T07:00:00.000Z") },
  { x: new Date("2016-07-10T07:00:00.000Z") },
  { x: new Date("2011-01-03T08:00:00.000Z") },
  { x: new Date("2020-03-20T07:00:00.000Z") },
  { x: new Date("2010-04-25T07:00:00.000Z") },
  { x: new Date("2020-11-23T08:00:00.000Z") },
  { x: new Date("2016-09-05T07:00:00.000Z") },
  { x: new Date("2013-02-24T08:00:00.000Z") },
  { x: new Date("2016-04-11T07:00:00.000Z") },
  { x: new Date("2015-07-07T07:00:00.000Z") },
  { x: new Date("2018-11-19T08:00:00.000Z") },
  { x: new Date("2014-01-09T08:00:00.000Z") },
  { x: new Date("2016-03-05T08:00:00.000Z") },
  { x: new Date("2011-02-07T08:00:00.000Z") },
  { x: new Date("2016-02-17T08:00:00.000Z") },
  { x: new Date("2017-06-21T07:00:00.000Z") },
  { x: new Date("2013-10-23T07:00:00.000Z") },
  { x: new Date("2017-08-24T07:00:00.000Z") },
  { x: new Date("2018-01-17T08:00:00.000Z") },
  { x: new Date("2015-04-19T07:00:00.000Z") },
  { x: new Date("2016-05-10T07:00:00.000Z") },
  { x: new Date("2018-01-01T08:00:00.000Z") },
  { x: new Date("2017-01-01T08:00:00.000Z") },
  { x: new Date("2021-10-02T07:00:00.000Z") },
  { x: new Date("2012-02-20T08:00:00.000Z") },
  { x: new Date("2010-04-07T07:00:00.000Z") },
  { x: new Date("2019-07-21T07:00:00.000Z") },
  { x: new Date("2014-06-15T07:00:00.000Z") }
];

storiesOf("VictoryHistogram", module)
  .add("default rendering", () => <VictoryHistogram />)
  .add("default rendering with data", () => <VictoryHistogram data={data} />);

/* barSpacing */
storiesOf("VictoryHistogram.barSpacing.vertical", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bar spacing = 10", () => <VictoryHistogram data={data} barSpacing={10} />)
  .add("bar spacing = 5", () => <VictoryHistogram data={data} barSpacing={5} />);

storiesOf("VictoryHistogram.barSpacing.horizontal", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("bar spacing = 10", () => <VictoryHistogram data={data} horizontal barSpacing={10} />)
  .add("bar spacing = 5", () => <VictoryHistogram data={data} horizontal barSpacing={5} />);

/* data */
storiesOf("VictoryHistogram.data.dates", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("date data from 2015-2020", () => <VictoryHistogram data={timeData} />)
  .add("date data from 2020", () => {
    const newTimeData = timeData.map(({ x }) => {
      const newDate = new Date(x);

      newDate.setFullYear(2020);
      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  })
  .add("date data from Jan-June 2020", () => {
    const newTimeData = timeData.map(({ x }, index) => {
      const newDate = new Date(x);

      newDate.setFullYear(2020);

      newDate.setMonth(Math.ceil(index / 100));
      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  })
  .add("data date from May 2020", () => {
    const newTimeData = timeData.map(({ x }) => {
      const newDate = new Date(x);

      newDate.setMonth(4);
      newDate.setFullYear(2020);

      return { x: newDate };
    });
    return <VictoryHistogram data={newTimeData} />;
  });

storiesOf("VictoryHistogram.data", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with data accessors", () => (
    <VictoryHistogram data={data.map(({ x }) => ({ value: x }))} x={({ value }) => value} />
  ))
  .add("with time data accessors", () => (
    <VictoryHistogram
      bins="year"
      data={timeData.map(({ x }) => ({ value: x }))}
      x={({ value }) => value}
    />
  ))
  .add("with empty data", () => <VictoryHistogram data={[]} />)
  .add("with empty data and numeric bins", () => <VictoryHistogram data={[]} bins={2} />)
  .add("with empty data and defined bins", () => (
    <VictoryHistogram data={[]} bins={[0, 30, 100, 150]} />
  ));

/* bins */
storiesOf("VictoryHistogram.bins.dates", module)
  .add("with custom bins = [01/01/2020, 01/06/2020, 01/01/2021]", () => (
    <VictoryHistogram
      data={timeData}
      bins={[new Date(2020, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
    />
  ))
  .add("numeric bins = 2", () => <VictoryHistogram data={timeData} bins={2} />)
  .add("numeric bins = 10", () => <VictoryHistogram data={timeData} bins={10} />)
  .add("day bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcDay);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("month bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcMonth);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("year bins", () => {
    const niceTimeScale = d3Scale
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();
    const ticks = niceTimeScale.ticks(d3Time.utcYear);

    return <VictoryHistogram data={timeData} bins={ticks} />;
  })
  .add("default", () => <VictoryHistogram data={timeData} />);

storiesOf("VictoryHistogram.bins.vertical", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram data={data} bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram data={data} bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram data={data} bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => (
    <VictoryHistogram data={data} bins={[0, 30, 50, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 50]", () => <VictoryHistogram data={data} bins={[0, 30, 50]} />)
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram data={data} bins={[0, 20, 30, 70, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 70, 100, 130]", () => (
    <VictoryHistogram data={data} bins={[0, 30, 70, 100, 130]} />
  ))
  .add("custom bins/edges = [0, 10, 30, 70, 150]", () => (
    <VictoryHistogram data={data} bins={[0, 10, 30, 70, 150]} />
  ))
  .add("custom bins/edges = [30, 70, 150]", () => (
    <VictoryHistogram data={data} bins={[30, 70, 150]} />
  ));

storiesOf("VictoryHistogram.bins.horizontal", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("numeric bins = 2", () => <VictoryHistogram data={data} horizontal bins={2} />)
  .add("numeric bins = 8", () => <VictoryHistogram data={data} horizontal bins={8} />)
  .add("numeric bins = 40", () => <VictoryHistogram data={data} horizontal bins={40} />)
  .add("custom bins/edges = [0, 30, 50, 100]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 50, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 50]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 50]} />
  ))
  .add("custom bins/edges = [0, 20, 30, 70, 100]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 20, 30, 70, 100]} />
  ))
  .add("custom bins/edges = [0, 30, 70, 100, 130]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 30, 70, 100, 130]} />
  ))
  .add("custom bins/edges = [0, 10, 30, 70, 150]", () => (
    <VictoryHistogram data={data} horizontal bins={[0, 10, 30, 70, 150]} />
  ))
  .add("custom bins/edges = [30, 70, 150]", () => (
    <VictoryHistogram data={data} horizontal bins={[30, 70, 150]} />
  ));

/* styles */
storiesOf("VictoryHistogram.styles", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("with styles", () => (
    <VictoryHistogram
      data={data}
      style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryHistogram
      horizontal
      data={data}
      style={{
        labels: {
          fill: ({ datum }) =>
            datum.binnedDatums.some(({ x }) => x === 22) ? "palevioletred" : "black"
        },
        data: {
          stroke: ({ datum }) => (datum.y > 3 ? "red" : "transparent"),
          strokeWidth: 3,
          opacity: ({ datum }) => (datum.y > 3 ? 1 : 0.4)
        }
      }}
      labels={["one", "two", "three", "four", "five"]}
    />
  ));

/* theme */
storiesOf("VictoryHistogram.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryHistogram data={data} />);

storiesOf("VictoryHistogram.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryHistogram data={data} />);

/* corner radius */
storiesOf("VictoryHistogram.cornerRadius", module)
  .addDecorator(getChartDecorator())
  .add("cornerRadius = 1", () => <VictoryHistogram data={data} cornerRadius={1} />)
  .add("cornerRadius = 5", () => <VictoryHistogram data={data} cornerRadius={5} />)
  .add("cornerRadius = 7", () => <VictoryHistogram data={data} cornerRadius={7} />)
  .add("cornerRadius = 5 (horizontal)", () => (
    <VictoryHistogram horizontal data={data} cornerRadius={5} />
  ));

/* getPath */
storiesOf("VictoryHistogram.getPath", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("custom bar path (vertical)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y0}
        L ${(x1 + x0) / 2}, ${y1}
        L ${x1}, ${y0}
        z`;
    };
    return <VictoryHistogram data={data} getPath={getPathFn} />;
  })
  .add("custom bar path (horizontal)", () => {
    const getPathFn = (props) => {
      const { x0, x1, y0, y1 } = props;
      return `M ${x0}, ${y1}
        L ${x1}, ${(y0 + y1) / 2}
        L ${x0}, ${y0}
        z`;
    };
    return <VictoryHistogram data={data} horizontal getPath={getPathFn} />;
  });

/* labels */
storiesOf("VictoryHistogram.labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryHistogram data={data} labels={({ datum }) => `${datum.x} - ${datum.end}`} />
  ))
  .add("function labels (horizontal)", () => (
    <VictoryHistogram horizontal data={data} labels={({ datum }) => `${datum.x} - ${datum.end}`} />
  ))
  .add("array labels", () => (
    <VictoryHistogram data={data} labels={["", "", "three", "four", 5, "six"]} />
  ));

/* tooltips */
storiesOf("VictoryHistogram.tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryHistogram
      data={data}
      labels={({ datum }) => `${datum.x} - ${datum.end}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (horizontal)", () => (
    <VictoryHistogram
      horizontal
      data={data}
      labels={({ datum }) => `${datum.x} - ${datum.end}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("array tooltips with long and short strings", () => (
    <VictoryHistogram
      data={data}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active />}
    />
  ));

/* scale */
storiesOf("VictoryHistogram.scale", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("time scale", () => <VictoryHistogram bins="month" data={timeData} />)
  .add("time scale with labels", () => (
    <VictoryHistogram
      barSpacing={10}
      data={timeData}
      bins="year"
      labels={({ datum }) => `${datum.x.getFullYear()} - ${datum.end.getFullYear()}`}
    />
  ))
  .add("horizontal time scale with labels", () => (
    <VictoryHistogram
      horizontal
      barSpacing={10}
      data={timeData}
      bins="year"
      labels={({ datum }) => `${datum.x.getFullYear()} - ${datum.end.getFullYear()}`}
    />
  ));

storiesOf("VictoryHistogram.scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" }, domainPadding: 25 }))
  .add("log scale", () => <VictoryHistogram data={data} />)
  .add("horizontal log scale", () => <VictoryHistogram horizontal data={data} />);

storiesOf("VictoryHistogram.with other charts", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with line", () => [
    <VictoryHistogram key="histogram" data={data} />,
    <VictoryLine
      key="line"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ])
  .add("with scatter", () => [
    <VictoryHistogram key="histogram" data={data} />,
    <VictoryScatter
      key="scatter"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ])
  .add("with line horizontal", () => [
    <VictoryHistogram horizontal key="histogram" data={data} />,
    <VictoryLine
      horizontal
      key="line"
      data={[
        { x: 0, y: 5 },
        { x: 10, y: 5 },
        { x: 20, y: 2 },
        { x: 30, y: 9 },
        { x: 50, y: 2 },
        { x: 60, y: 4 },
        { x: 80, y: 12 },
        { x: 120, y: 8 }
      ]}
    />
  ]);
