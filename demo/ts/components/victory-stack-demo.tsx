import React from "react";
import { VictoryStack } from "@packages/victory-stack/src/index";
import { VictoryArea } from "@packages/victory-area/src/index";

class App extends React.Component {
  
  render() {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Standalone Stack</h3>
        <VictoryStack
          aria-label="Victory Stack Demo"
          data-some-user-prop="TESTING 123"
        >
          <VictoryArea
            data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
          />
        </VictoryStack>
      </div>
    )
  }
}

export default App;