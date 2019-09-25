import React from "react";

const Path = (props) => {
  // eslint-disable-next-line react/prop-types
  const { desc, ...rest } = props;
  return desc ? (
    <path {...rest}>
      <desc>{desc}</desc>
    </path>
  ) : (
    <path {...rest} />
  );
};

export default Path;
