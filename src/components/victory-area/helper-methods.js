import { last } from "lodash";
import { Helpers } from "victory-core";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";

export default {

  getBaseProps(props, defaultStyles) {
    defaultStyles = props.theme && props.theme.area ? props.theme.area : defaultStyles;
    const {scale, style, data} = this.getCalculatedValues(props, defaultStyles);
    const {interpolation, label} = props;

    const dataProps = {
      data,
      scale,
      interpolation: Helpers.evaluateProp(interpolation, data),
      style: Helpers.evaluateStyle(style.data, data)
    };

    const text = Helpers.evaluateProp(label, data);
    const lastData = last(data);
    const labelStyle = Helpers.evaluateStyle(style.labels, data);

    const labelProps = {
      x: scale.x(lastData.x) + labelStyle.padding,
      y: scale.y(lastData.y1),
      y0: scale.y(lastData.y0),
      style: labelStyle,
      textAnchor: labelStyle.textAnchor || "start",
      verticalAnchor: labelStyle.verticalAnchor || "middle",
      angle: labelStyle.angle,
      data,
      scale,
      text
    };
    return {
      "all": {
        data: dataProps,
        labels: labelProps
      }
    };
  },

  getCalculatedValues(props, defaultStyles) {
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const data = this.getDataWithBaseline(props, domain);
    return { style, data, scale };
  },

  getDataWithBaseline(props, domain) {
    const data = Data.getData(props);
    const minY = Math.min(...domain.y) > 0 ? Math.min(...domain.y) : 0;
    return data.map((datum) => {
      const y1 = datum.yOffset ? datum.yOffset + datum.y : datum.y;
      const y0 = datum.yOffset || minY;
      return Object.assign({y0, y1}, datum);
    });
  }
};
