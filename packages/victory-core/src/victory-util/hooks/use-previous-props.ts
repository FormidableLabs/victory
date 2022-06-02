import React from "react";

export function usePreviousProps<T = any>(props: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = props;
  });
  return ref.current;
}
