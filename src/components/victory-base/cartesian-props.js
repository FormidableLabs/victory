import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes } from "victory-core";

export default {
  /**
   * The categories prop specifies how categorical data for a chart should be ordered.
   * This prop should be given as an array of string values, or an object with
   * these arrays of values specified for x and y. If this prop is not set,
   * categorical data will be plotted in the order it was given in the data array
   * @examples ["dogs", "cats", "mice"]
   */
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  domainPadding: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([
        PropTypes.number,
        CustomPropTypes.domain
      ]),
      y: PropTypes.oneOfType([
        PropTypes.number,
        CustomPropTypes.domain
      ])
    }),
    PropTypes.number
  ]),
  /**
   * The domain prop describes the range of values your bar chart will cover. This prop can be
   * given as a array of the minimum and maximum expected values for your bar chart,
   * or as an object that specifies separate arrays for x and y.
   * If this prop is not provided, a domain will be calculated from data, or other
   * available information.
   * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
   */
  domain: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({
      x: CustomPropTypes.domain,
      y: CustomPropTypes.domain
    })
  ]),
  /**
   * The scale prop determines which scales your chart should use. This prop can be
   * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
   * as a d3 scale function, or as an object with scales specified for x and y
   * @exampes d3Scale.time(), {x: "linear", y: "log"}
   */
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({
      x: CustomPropTypes.scale,
      y: CustomPropTypes.scale
    })
  ])
};
