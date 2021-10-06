import React from "react";
import PropTypes from "prop-types";
import { Defs, ClipPath, G } from "react-native-svg";

export default class VClipPath extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  render() {
    const { children, clipId } = this.props;
    // Wrap in G not to cause exceptions in old react-native-svg
    // https://github.com/FormidableLabs/victory-native/issues/432#issuecomment-475927581
    return (
      <G>
        <Defs>
          <ClipPath id={clipId}>{children}</ClipPath>
        </Defs>
      </G>
    );
  }
}
