import PropTypes from "prop-types";
import { PropTypes as CustomPropTypes } from "victory-core";

export const DataProps = {
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataComponent: PropTypes.element,
  labelComponent: PropTypes.element,
  labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
  samples: CustomPropTypes.nonNegative,
  sortKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  sortOrder: PropTypes.oneOf(["ascending", "descending"]),
  style: PropTypes.shape({
    parent: PropTypes.object, data: PropTypes.object, labels: PropTypes.object
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

export const BaseProps = {
  animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  containerComponent: PropTypes.element,
  domain: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
  ]),
  domainPadding: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([ PropTypes.number, PropTypes.arrayOf(PropTypes.number) ]),
      y: PropTypes.oneOfType([ PropTypes.number, PropTypes.arrayOf(PropTypes.number) ])
    }),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  eventKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
    PropTypes.string
  ]),
  events: PropTypes.arrayOf(PropTypes.shape({
    target: PropTypes.oneOf(["data", "labels", "parent"]),
    eventKey: PropTypes.oneOfType([
      PropTypes.array,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    eventHandlers: PropTypes.object
  })),
  externalEventMutations: PropTypes.arrayOf(PropTypes.shape({
    callback: PropTypes.function,
    childName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    eventKey: PropTypes.oneOfType([
      PropTypes.array,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    mutation: PropTypes.function,
    target: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  })),
  groupComponent: PropTypes.element,
  height: CustomPropTypes.nonNegative,
  name: PropTypes.string,
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number, bottom: PropTypes.number,
      left: PropTypes.number, right: PropTypes.number
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
  standalone: PropTypes.bool,
  theme: PropTypes.object,
  width: CustomPropTypes.nonNegative
};
