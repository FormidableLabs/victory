import React from "react";

const Path = (props) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    <path vectorEffect="non-scaling-stroke" {...rest}>
      <desc>{desc}</desc>
    </path>
  ) : (
    <path vectorEffect="non-scaling-stroke" {...rest} />
  );
};

export default Path;
