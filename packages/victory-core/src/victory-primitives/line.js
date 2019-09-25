import React from "react";

const Line = (props) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    <line vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </line>
  ) : (
    <line vectorEffect="non-scaling-stroke" {...rest} />
  );
};

export default Line;
