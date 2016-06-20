export default {
  modifyProps(props, fallbackProps) {
    const themeCheck = props.theme && props.theme.props;
    const heightFallbacks = props.height || fallbackProps.props.height;
    const widthFallbacks = props.width || fallbackProps.props.width;

    const width = themeCheck ?
    props.width || props.theme.props.width || fallbackProps.props.width :
    widthFallbacks;

    const height = themeCheck ?
    props.height || props.theme.props.height || fallbackProps.props.height :
    heightFallbacks;

    return Object.assign({}, props, { width, height });
  }
};
