import React from "react";

import { range, random } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryAxis } from "victory-axis";
import { VictoryScatter } from "victory-scatter";
import { VictoryBar } from "victory-bar";
import {
  CanvasBar,
  CanvasCurve,
  CanvasGroup,
  CanvasPoint,
} from "victory-canvas";
import { VictoryTheme } from "victory-core";

const populationData = [
  {
    country: "United States",
    values: [
      { year: 1960, value: 180671000 },
      { year: 1961, value: 183691000 },
      { year: 1962, value: 186538000 },
      { year: 1963, value: 189242000 },
      { year: 1964, value: 191889000 },
      { year: 1965, value: 194303000 },
      { year: 1966, value: 196560000 },
      { year: 1967, value: 198712000 },
      { year: 1968, value: 200706000 },
      { year: 1969, value: 202677000 },
      { year: 1970, value: 205052000 },
      { year: 1971, value: 207661000 },
      { year: 1972, value: 209896000 },
      { year: 1973, value: 211909000 },
      { year: 1974, value: 213854000 },
      { year: 1975, value: 215973000 },
      { year: 1976, value: 218035000 },
      { year: 1977, value: 220239000 },
      { year: 1978, value: 222585000 },
      { year: 1979, value: 225055000 },
      { year: 1980, value: 227225000 },
      { year: 1981, value: 229466000 },
      { year: 1982, value: 231664000 },
      { year: 1983, value: 233792000 },
      { year: 1984, value: 235825000 },
      { year: 1985, value: 237924000 },
      { year: 1986, value: 240133000 },
      { year: 1987, value: 242289000 },
      { year: 1988, value: 244499000 },
      { year: 1989, value: 246819000 },
      { year: 1990, value: 249623000 },
      { year: 1991, value: 252981000 },
      { year: 1992, value: 256514000 },
      { year: 1993, value: 259919000 },
      { year: 1994, value: 263126000 },
      { year: 1995, value: 266278000 },
      { year: 1996, value: 269394000 },
      { year: 1997, value: 272657000 },
      { year: 1998, value: 275854000 },
      { year: 1999, value: 279040000 },
      { year: 2000, value: 282162411 },
      { year: 2001, value: 284968955 },
      { year: 2002, value: 287625193 },
      { year: 2003, value: 290107933 },
      { year: 2004, value: 292805298 },
      { year: 2005, value: 295516599 },
      { year: 2006, value: 298379912 },
      { year: 2007, value: 301231207 },
      { year: 2008, value: 304093966 },
      { year: 2009, value: 306771529 },
      { year: 2010, value: 309321666 },
      { year: 2011, value: 311556874 },
      { year: 2012, value: 313830990 },
      { year: 2013, value: 315993715 },
      { year: 2014, value: 318301008 },
      { year: 2015, value: 320635163 },
      { year: 2016, value: 322941311 },
      { year: 2017, value: 324985539 },
      { year: 2018, value: 326687501 },
      { year: 2019, value: 328239523 },
    ],
  },
  {
    country: "United Kingdom",
    values: [
      { year: 1960, value: 52400000 },
      { year: 1961, value: 52800000 },
      { year: 1962, value: 53250000 },
      { year: 1963, value: 53650000 },
      { year: 1964, value: 54000000 },
      { year: 1965, value: 54348050 },
      { year: 1966, value: 54648500 },
      { year: 1967, value: 54943600 },
      { year: 1968, value: 55211700 },
      { year: 1969, value: 55441750 },
      { year: 1970, value: 55663250 },
      { year: 1971, value: 55896223 },
      { year: 1972, value: 56086065 },
      { year: 1973, value: 56194527 },
      { year: 1974, value: 56229974 },
      { year: 1975, value: 56225800 },
      { year: 1976, value: 56211968 },
      { year: 1977, value: 56193492 },
      { year: 1978, value: 56196504 },
      { year: 1979, value: 56246951 },
      { year: 1980, value: 56314216 },
      { year: 1981, value: 56333829 },
      { year: 1982, value: 56313641 },
      { year: 1983, value: 56332848 },
      { year: 1984, value: 56422072 },
      { year: 1985, value: 56550268 },
      { year: 1986, value: 56681396 },
      { year: 1987, value: 56802050 },
      { year: 1988, value: 56928327 },
      { year: 1989, value: 57076711 },
      { year: 1990, value: 57247586 },
      { year: 1991, value: 57424897 },
      { year: 1992, value: 57580402 },
      { year: 1993, value: 57718614 },
      { year: 1994, value: 57865745 },
      { year: 1995, value: 58019030 },
      { year: 1996, value: 58166950 },
      { year: 1997, value: 58316954 },
      { year: 1998, value: 58487141 },
      { year: 1999, value: 58682466 },
      { year: 2000, value: 58892514 },
      { year: 2001, value: 59119673 },
      { year: 2002, value: 59370479 },
      { year: 2003, value: 59647577 },
      { year: 2004, value: 59987905 },
      { year: 2005, value: 60401206 },
      { year: 2006, value: 60846820 },
      { year: 2007, value: 61322463 },
      { year: 2008, value: 61806995 },
      { year: 2009, value: 62276270 },
      { year: 2010, value: 62766365 },
      { year: 2011, value: 63258810 },
      { year: 2012, value: 63700215 },
      { year: 2013, value: 64128273 },
      { year: 2014, value: 64602298 },
      { year: 2015, value: 65116219 },
      { year: 2016, value: 65611593 },
      { year: 2017, value: 66058859 },
      { year: 2018, value: 66460344 },
      { year: 2019, value: 66834405 },
      { year: 2020, value: null },
    ],
  },
  {
    country: "China",
    values: [
      { year: 1960, value: 667070000 },
      { year: 1961, value: 660330000 },
      { year: 1962, value: 665770000 },
      { year: 1963, value: 682335000 },
      { year: 1964, value: 698355000 },
      { year: 1965, value: 715185000 },
      { year: 1966, value: 735400000 },
      { year: 1967, value: 754550000 },
      { year: 1968, value: 774510000 },
      { year: 1969, value: 796025000 },
      { year: 1970, value: 818315000 },
      { year: 1971, value: 841105000 },
      { year: 1972, value: 862030000 },
      { year: 1973, value: 881940000 },
      { year: 1974, value: 900350000 },
      { year: 1975, value: 916395000 },
      { year: 1976, value: 930685000 },
      { year: 1977, value: 943455000 },
      { year: 1978, value: 956165000 },
      { year: 1979, value: 969005000 },
      { year: 1980, value: 981235000 },
      { year: 1981, value: 993885000 },
      { year: 1982, value: 1008630000 },
      { year: 1983, value: 1023310000 },
      { year: 1984, value: 1036825000 },
      { year: 1985, value: 1051040000 },
      { year: 1986, value: 1066790000 },
      { year: 1987, value: 1084035000 },
      { year: 1988, value: 1101630000 },
      { year: 1989, value: 1118650000 },
      { year: 1990, value: 1135185000 },
      { year: 1991, value: 1150780000 },
      { year: 1992, value: 1164970000 },
      { year: 1993, value: 1178440000 },
      { year: 1994, value: 1191835000 },
      { year: 1995, value: 1204855000 },
      { year: 1996, value: 1217550000 },
      { year: 1997, value: 1230075000 },
      { year: 1998, value: 1241935000 },
      { year: 1999, value: 1252735000 },
      { year: 2000, value: 1262645000 },
      { year: 2001, value: 1271850000 },
      { year: 2002, value: 1280400000 },
      { year: 2003, value: 1288400000 },
      { year: 2004, value: 1296075000 },
      { year: 2005, value: 1303720000 },
      { year: 2006, value: 1311020000 },
      { year: 2007, value: 1317885000 },
      { year: 2008, value: 1324655000 },
      { year: 2009, value: 1331260000 },
      { year: 2010, value: 1337705000 },
      { year: 2011, value: 1344130000 },
      { year: 2012, value: 1350695000 },
      { year: 2013, value: 1357380000 },
      { year: 2014, value: 1364270000 },
      { year: 2015, value: 1371220000 },
      { year: 2016, value: 1378665000 },
      { year: 2017, value: 1386395000 },
      { year: 2018, value: 1392730000 },
      { year: 2019, value: 1397715000 },
      { year: 2020, value: null },
    ],
  },
];

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const parentStyle = {
  border: "1px solid #ccc",
  margin: "2%",
  maxWidth: "40%",
};

const formatPopulation = (value) => {
  const ONE_BILLION = 1000000000;
  const ONE_MILLION = 1000000;
  if (value >= ONE_BILLION) {
    return `${value / ONE_BILLION}B`;
  } else if (value >= ONE_MILLION) {
    return `${value / ONE_MILLION}M`;
  }
  return value;
};

const getRandomData = (length = 100) => {
  const data: any = [];
  for (let i = 0; i < length; i++) {
    data.push({ x: Math.random(), y: Math.random() });
  }
  return data;
};

const CanvasDemo = () => {
  const getData = () => {
    return range(20).map((i) => {
      return {
        x: i,
        y: Math.random(),
      };
    });
  };

  const getStyles = () => {
    const colors = VictoryTheme.clean.palette?.qualitative ?? [
      "red",
      "orange",
      "gold",
      "tomato",
      "magenta",
      "purple",
    ];
    return {
      fill: colors[random(0, colors.length - 1)],
    };
  };

  const [barData, setBarData] = React.useState(getData());
  const [barStyle, setBarStyle] = React.useState(getStyles());

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setBarData(getData());
      setBarStyle(getStyles());
    }, 3000);
    return () => {
      window.clearInterval(interval);
    };
  }, [setBarData, setBarStyle]);

  return (
    <div className="demo" style={containerStyle}>
      <VictoryChart
        theme={VictoryTheme.clean}
        animate
        style={{ parent: parentStyle }}
      >
        {populationData.map(({ country, values }) => {
          const data = values.map(({ year, value }) => ({
            x: year,
            y: value,
          }));
          return (
            <VictoryLine
              key={country}
              data={data}
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasCurve />}
            />
          );
        })}
        <VictoryAxis tickFormat={(v) => v} />
        <VictoryAxis dependentAxis tickFormat={formatPopulation} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean} style={{ parent: parentStyle }}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getRandomData(1000)}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean} style={{ parent: parentStyle }}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          animate
          data={barData}
          style={{
            data: barStyle,
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default CanvasDemo;
