import PropTypes from "prop-types";
import React from "react";
import { getBaseProps } from "./helper-methods";
import Bar from "./bar";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  useEvents,
  Data,
  Domain,
  VictoryTransition
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 }
];

const VictoryBar = (props) => {
  const modifiedProps = React.useMemo(
    () => Helpers.modifyProps(props, fallbackProps, "bar"),
    [props]
  );

  const { renderedData, renderContainer } = useEvents(modifiedProps, {
    expectedComponents: VictoryBar.expectedComponents,
    getBaseProps: VictoryBar.getBaseProps,
    role: "bar",
    animationWhitelist: VictoryBar.animationWhitelist
  });

  return props.standalone
    ? renderContainer(props.containerComponent, renderedData)
    : renderedData;
};

VictoryBar.animationWhitelist = [
  "data",
  "domain",
  "height",
  "padding",
  "style",
  "width"
];

VictoryBar.displayName = "VictoryBar";

VictoryBar.role = "bar";

VictoryBar.defaultTransitions = {
  onLoad: {
    duration: 2000,
    before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
    after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
  },
  onExit: {
    duration: 500,
    before: () => ({ _y: 0, yOffset: 0 })
  },
  onEnter: {
    duration: 500,
    before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
    after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
  },
  onMove: {
    duration: 500
  }
};

VictoryBar.propTypes = {
  ...CommonProps.baseProps,
  ...CommonProps.dataProps,
  alignment: PropTypes.oneOf(["start", "middle", "end"]),
  barRatio: PropTypes.number,
  barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
    })
  ]),
  getPath: PropTypes.func,
  horizontal: PropTypes.bool
};

VictoryBar.defaultProps = {
  containerComponent: <VictoryContainer />,
  data: defaultData,
  dataComponent: <Bar />,
  groupComponent: <g role="presentation" />,
  labelComponent: <VictoryLabel />,
  samples: 50,
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale
};

VictoryBar.getDomain = Domain.getDomainWithZero;
VictoryBar.getData = Data.getData;
VictoryBar.getBaseProps = (props) => getBaseProps(props, fallbackProps);
VictoryBar.expectedComponents = [
  "dataComponent",
  "labelComponent",
  "groupComponent",
  "containerComponent"
];

// This component is at the top level so VictoryBar has access to the animation props
const Wrapper = (props) => {
  // TODO: Figure out how to override this in victory-native
  const shouldAnimate = React.useMemo(() => {
    return !!props.animate;
  }, [props]);

  const animationWhitelist = React.useMemo(() => {
    return props.animate && props.animate.animationWhitelist
      ? props.animate.animationWhitelist
      : VictoryBar.animationWhitelist;
  }, [props]);

  if (shouldAnimate) {
    return (
      <VictoryTransition
        animate={props.animate}
        animationWhitelist={animationWhitelist}
      >
        <VictoryBar {...props} />
      </VictoryTransition>
    );
  }

  return <VictoryBar {...props} />;
};

Wrapper.propTypes = VictoryBar.propTypes;
Wrapper.role = VictoryBar.role;
Wrapper.getBaseProps = VictoryBar.getBaseProps;

export default Wrapper;
