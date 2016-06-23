import React, { PropTypes } from "react";

export default class VictoryContainer extends React.Component {
  static propTypes = {
    /**
     * The style prop specifies styles for your VictoryContainer. Any valid inline style properties
     * will be applied, Styles from the child component will also be passed, if any exist.
     * @examples {border: 1px solid red}
     */
    style: PropTypes.object,
    /**
     * The transform prop applies a transform to the rendered group element.
     * In addition to being a string, it can be an object containing transform
     * definitions for easier authoring.
     */
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /**
     * VictoryContainer is a wrapper component that controls some props and behaviors of its
     * children. VictoryContainer works with all Victory components.
     * If no children are provided, VictoryContainer will render an empty g tag.
     * Props from children are used to determine default style, height, and width.
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    /**
     * The role prop specifies the aria role to be applied to the group tag to assist
     * accessibility for screen readers.
     */
    role: PropTypes.string
  }

  static defaultProps = {
    role: "presentation"
  }

  render() {
    const { style, role, transform, children } = this.props;
    return (
      <g style={style} role={role} transfrorm={transform}>
        {children}
      </g>
      );
  }
}
