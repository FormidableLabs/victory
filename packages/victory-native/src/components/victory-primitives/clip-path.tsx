import React from "react";
import { Defs, ClipPath, G, ClipPathProps } from "react-native-svg";

export interface VictoryNativeClipPathProps extends ClipPathProps {
  clipId?: string;
}

const NativeClipPath = (props: VictoryNativeClipPathProps) => {
  const { children, clipId } = props;
  // Wrap in G not to cause exceptions in old react-native-svg
  // https://github.com/FormidableLabs/victory-native/issues/432#issuecomment-475927581
  return (
    <G>
      <Defs>
        <ClipPath id={clipId}>{children}</ClipPath>
      </Defs>
    </G>
  );
};

export default NativeClipPath;
