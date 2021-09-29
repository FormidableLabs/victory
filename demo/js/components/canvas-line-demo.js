/* eslint-disable no-magic-numbers */
import React from "react";
import {
  CanvasContainer,
  CanvasCurve,
  VictoryAxis,
  VictoryChart,
  VictoryLine
} from "victory";

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
      { year: 2019, value: 328239523 }
    ]
  }
];

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const parentStyle = {
  border: "1px solid #ccc",
  margin: "2%",
  maxWidth: "40%"
};

const CanvasLineDemo = () => {
  return (
    <div className="demo">
      <div style={containerStyle}>
        <VictoryChart
          style={parentStyle}
          containerComponent={<CanvasContainer />}
        >
          {populationData.map(({ country, values }) => {
            const data = values.map(({ year, value }) => ({
              x: year,
              y: value
            }));
            return (
              <VictoryLine
                key={country}
                data={data}
                dataComponent={<CanvasCurve />}
              />
            );
          })}
          <VictoryAxis tickFormat={(v) => v} />
          <VictoryAxis dependentAxis tickFormat={(v) => `${v / 1000000}M`} />
        </VictoryChart>
      </div>
    </div>
  );
};

export default CanvasLineDemo;
