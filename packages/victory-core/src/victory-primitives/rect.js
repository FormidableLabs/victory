import React from "react";

const Rect = (props) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    <rect vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </rect>
  ) : (
    <rect vectorEffect="non-scaling-stroke" {...rest} />
  );
};
export default Rect;
