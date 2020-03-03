/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
/* eslint-disable */
import React from "react";
import { VictoryChart, VictoryBar, VictoryGroup, VictoryStack } from "victory";

// const staticData = [
//   [
//     { x: 1, y: 0.009817927244408997 },
//     { x: 2, y: 0.42586222721782807 },
//     { x: 3, y: 0.4008184713786571 }
//   ],
//   [
//     { x: 1, y: 0.20424273601384724 },
//     { x: 2, y: 0.06850186146804682 },
//     { x: 3, y: 0.7475527052876683 }
//   ],
//   [
//     { x: 1, y: 0.7176360010060048 },
//     { x: 2, y: 0.3999913253586804 },
//     { x: 3, y: 0.8006962673556197 }
//   ],
//   [
//     { x: 1, y: 0.15508050339977686 },
//     { x: 2, y: 0.9006242816213939 },
//     { x: 3, y: 0.8135459504426841 }
//   ],
//   [
//     { x: 1, y: 0.8454739967041625 },
//     { x: 2, y: 0.6908533242234443 },
//     { x: 3, y: 0.6163376520330617 }
//   ]
// ];

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       barData: staticData //this.getBarData()
//     };
//   }

//   // componentDidMount() {
//   //   /* eslint-disable react/no-did-mount-set-state */
//   //   this.setStateInterval = window.setInterval(() => {
//   //     this.setState({
//   //       barData: this.getBarData()
//   //     });
//   //   }, 2000);
//   // }

//   // componentWillUnmount() {
//   //   window.clearInterval(this.setStateInterval);
//   // }

//   getBarData() {
//     return [1, 2, 3, 4, 5].map(() => {
//       return [{ x: 1, y: Math.random() }, { x: 2, y: Math.random() }, { x: 3, y: Math.random() }];
//     });
//   }

//   render() {
//     return (
//       <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
//         <VictoryChart domainPadding={{ x: 50 }} animate>
//           <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
//             <VictoryStack colorScale={"red"}>
//               {this.state.barData.map((data, index) => {
//                 return <VictoryBar key={index} data={data} />;
//               })}
//             </VictoryStack>
//             <VictoryStack colorScale={"green"}>
//               {this.state.barData.map((data, index) => {
//                 return <VictoryBar key={index} data={data} />;
//               })}
//             </VictoryStack>
//             <VictoryStack colorScale={"blue"}>
//               {this.state.barData.map((data, index) => {
//                 return <VictoryBar key={index} data={data} />;
//               })}
//             </VictoryStack>
//           </VictoryGroup>
//         </VictoryChart>
//       </div>
//     );
//   }
// }

export const VictoryExample = () => {
  return (
    <>
      <VictoryChart height={1000} width={500} horizontal>
        <VictoryGroup standalone={false} offset={20} style={{ data: { width: 10 } }} horizontal>
          {[...Array(10).keys()].map((index) => (
            <VictoryStack colorScale={"blue"} horizontal>
              {[...Array(10).keys()].map((index) => (
                <VictoryBar data={generateFakeData(10, 5)} />
              ))}
            </VictoryStack>
          ))}
        </VictoryGroup>
      </VictoryChart>
    </>
  );
};

const generateFakeData = (n, range) =>
  [...Array(n).keys()].map((index) => ({
    x: index + 1,
    y: Math.random() * range
  }));

class ShowChartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render = () => (
    <>
      <div className={"showHideButton"}>
        <input
          type={"button"}
          value={"show the chart"}
          onClick={() => this.setState({ show: !this.state.show })}
        />
      </div>
      {this.state.show && <VictoryExample />}
    </>
  );
}
function App() {
  return (
    <div className="App" style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <ShowChartButton />
    </div>
  );
}

export default App;
