export default {
  getWidthHeight(props, defaultWidthHeight) {
    const width = props.theme && props.theme.props ?
    props.width || props.theme.props.width || defaultWidthHeight.width :
    props.width || defaultWidthHeight.width;
    const height = props.theme && props.theme.props ?
    props.height || props.theme.props.height || defaultWidthHeight.height :
    props.height || defaultWidthHeight.height;
    return { width, height };
  }
};
