import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Text extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    desc: PropTypes.string,
    dx: PropTypes.number,
    dy: PropTypes.number,
    events: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string,
    transform: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    const { className, x, y, dx, dy, transform, style, children, title, desc } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [dx, nextProps.rx],
      [dy, nextProps.ry],
      [title, nextProps.title],
      [desc, nextProps.desc],
      [transform, nextProps.transform],
      [style, nextProps.style],
      [children, nextProps.children]
    ])) {
      return true;
    }
    return false;
  }

  render() {
    const {
      x, y, dx, dy, events, className, children, style, title, desc, transform
    } = this.props;
    return (
      <text
        className={className} x={x} dx={dx} y={y} dy={dy}
        transform={transform} style={style}
        {...events}
      >
        {title && <title>{title}</title>}
        {desc && <desc>{desc}</desc>}
        {children}
      </text>
    );
  }
}
