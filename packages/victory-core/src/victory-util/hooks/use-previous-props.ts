import React from "react";

export function usePreviousProps<T>(props: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    ref.current = props;
  });
  return ref.current;
}
