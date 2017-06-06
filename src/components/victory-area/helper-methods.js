import { assign } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

export default {

  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "area");
    props = assign({}, modifiedProps, this.getCalculatedValues(modifiedProps));
    const {
      data, domain, events, groupComponent, height, interpolation, origin, padding, polar,
      scale, sharedEvents, standalone, style, theme, width
    } = props;
    const initialChildProps = {
      parent: {
        style: style.parent, width, height, scale, data, domain,
        standalone, theme, polar, origin, padding
      },
      all: {
        data: { polar, origin, scale, data, interpolation, groupComponent, style: style.data }
      }
    };
    return data.reduce((childProps, datum, index) => {
      const text = LabelHelpers.getText(props, datum, index);
      if (text !== undefined && text !== null || events || sharedEvents) {
        const eventKey = datum.eventKey || index;
        childProps[eventKey] = { labels: LabelHelpers.getProps(props, index) };
      }
      return childProps;
    }, initialChildProps);
  },

  getCalculatedValues(props) {
    const { theme, polar } = props;
    const defaultStyles = theme && theme.area && theme.area.style ? theme.area.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles);
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
    const origin = polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
    const data = this.getDataWithBaseline(props, scale);
    return { style, data, scale, domain, origin };
  },

  getDataWithBaseline(props, scale) {
    let data = Data.getData(props);

    if (data.length < 2) {
      data = [];
    }
    const defaultMin = Scale.getType(scale.y) === "log" ? 1 / Number.MAX_SAFE_INTEGER : 0;
    const domainY = scale.y.domain();
    const minY = Math.min(...domainY) > 0 ? Math.min(...domainY) : defaultMin;

    return data.map((datum) => {
      const _y1 = datum._y1 !== undefined ? datum._y1 : datum._y;
      const _y0 = datum._y0 !== undefined ? datum._y0 : minY;
      return assign({}, datum, { _y0, _y1 });
    });
  }
};
