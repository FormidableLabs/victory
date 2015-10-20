import React from 'react';
import Ecology from 'ecology';
import Radium, { Style } from 'radium';

import theme from './theme';

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div className="Container">
        <div className="Copy">
          <Ecology
            overview={require('!!raw!./ecology.md')}
            source={require('json!./victory-pie.json')}
            scope={{React, VictoryPie: require('../src/components/victory-pie')}}/>
          <Style rules={theme}/>
        </div>
      </div>
    )
  }
}

const content = document.getElementById("content");
React.render(<Docs/>, content);
