'use strict';

import React from 'react/addons';

var propTypesArray = [{
  key: 'array',
  test: React.PropTypes.array,
  isRequired: React.PropTypes.array.isRequired
}, {
  key: 'boolean',
  test: React.PropTypes.bool,
  isRequired: React.PropTypes.bool.isRequired
}, {
  key: 'function',
  test: React.PropTypes.func,
  isRequired: React.PropTypes.func.isRequired
}, {
  key: 'number',
  test: React.PropTypes.number,
  isRequired: React.PropTypes.number.isRequired
}, {
  key: 'object',
  test: React.PropTypes.object,
  isRequired: React.PropTypes.array.isRequired
}, {
  key: 'string',
  test: React.PropTypes.string,
  isRequired: React.PropTypes.string.isRequired
}, {
  key: 'node',
  test: React.PropTypes.node,
  isRequired: React.PropTypes.node.isRequired
}, {
  key: 'element',
  test: React.PropTypes.element,
  isRequired: React.PropTypes.element.isRequired
}];

var getReactPropType = function (propTypeFunc) {
  var propType = {
    name: 'custom',
    isRequire: false
  };

  for (var i = 0; i < propTypesArray.length; i++) {
    if (propTypeFunc === propTypesArray[i].test) {
      propType.name = propTypesArray[i].key;

      break;
    }

    if (propTypeFunc === propTypesArray[i].isRequired) {
      propType.name = propTypesArray[i].key;
      propType.isRequired = true;

      break;
    }
  }

  return propType;
}

module.exports = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.renderable,
    propDescriptionMap: React.PropTypes.object,
    ignore: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      propDescriptionMap: {},
      ignore: []
    };
  },
  render() {
    var propTypes = [];

    for (var propName in this.props.componentClass.propTypes) {
      if (this.props.ignore.indexOf(propName)) {
        propTypes.push({
          propName: propName,
          type: getReactPropType(this.props.componentClass.propTypes[propName]),
          description: this.props.propDescriptionMap[propName] || ''
        });
      }
    }

    return (
      <div>
        <ul>
          {propTypes.map(function (propObj) {
            return (
              <li key={propObj.propName}>
                <b>{propObj.propName}</b>
                <i>{': ' + propObj.type.name}</i>
                {propObj.description && ' - ' + propObj.description}
                <b>{propObj.type.isRequired ? ' required' : ''}</b>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});
