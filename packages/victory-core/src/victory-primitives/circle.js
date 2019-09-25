import React from "react";

const Circle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    <circle vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </circle>
  ) : (
    <circle vectorEffect="non-scaling-stroke" {...rest} />
  );
};

export default Circle;
