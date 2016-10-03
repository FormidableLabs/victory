import React, { PropTypes } from "react";

export default class Slice extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object,
    datum: PropTypes.object,
    events: PropTypes.object,
    endAngle: PropTypes.number,
    startAngle: PropTypes.number,
    padAngle: PropTypes.number
  };

  renderSlice(path, style, events) {
    return <path d={path} style={style} {...events}/>;
  }

  getPath(props) {
    const { endAngle, startAngle, padAngle, index, datum, pathFunction } = props;
    return pathFunction({
      endAngle, startAngle, padAngle, index, data: datum, value: datum.y
    });
  }

  render() {
    const path = this.getPath(this.props);
    const { style, events } = this.props;
    return this.renderSlice(path, style, events);
  }
}
