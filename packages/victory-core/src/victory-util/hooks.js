import React from "react";

export const usePreviousProps = (props) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = props;
  });
  return ref.current || {};
};
