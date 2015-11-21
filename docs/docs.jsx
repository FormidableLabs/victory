import React from 'react';
import ReactDOM from 'react-dom';
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
            scope={{React, ReactDOM, VictoryPie: require('../src/components/victory-pie')}}
            playgroundtheme='elegant' />
          <Style rules={theme}/>
        </div>
      </div>
    )
  }
}

export default Docs;
