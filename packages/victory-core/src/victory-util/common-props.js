import PropTypes from "prop-types";
import CustomPropTypes from "./prop-types";

const dataProps = {
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataComponent: PropTypes.element,
  labelComponent: PropTypes.element,
  labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  samples: CustomPropTypes.nonNegative,
  sortKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  sortOrder: PropTypes.oneOf(["ascending", "descending"]),
  style: PropTypes.shape({
    parent: PropTypes.object,
    data: PropTypes.object,
    labels: PropTypes.object
  }),
  x: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  y: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  y0: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

const baseProps = {
  animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  containerComponent: PropTypes.element,
  domain: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
  ]),
  maxDomain: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    })
  ]),
  minDomain: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    })
  ]),
  domainPadding: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
    }),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  eventKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string
  ]),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })
  ),
  externalEventMutations: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.function,
      childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      mutation: PropTypes.function,
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    })
  ),
  groupComponent: PropTypes.element,
  height: CustomPropTypes.nonNegative,
  name: PropTypes.string,
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    })
  ]),
  polar: PropTypes.bool,
  range: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
  ]),
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
  ]),
  sharedEvents: PropTypes.shape({
    events: PropTypes.array,
    getEventState: PropTypes.func
  }),
  singleQuadrantDomainPadding: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool]),
      y: PropTypes.oneOfType([PropTypes.bool])
    })
  ]),
  standalone: PropTypes.bool,
  theme: PropTypes.object,
  width: CustomPropTypes.nonNegative
};

const primitiveProps = {
  active: PropTypes.bool,
  className: PropTypes.string,
  clipPath: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  events: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  polar: PropTypes.bool,
  role: PropTypes.string,
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
  ]),
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  transform: PropTypes.string
};

export default { baseProps, dataProps, primitiveProps };
