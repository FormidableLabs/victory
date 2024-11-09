import React from "react";

import * as Helpers from "./helpers";

type Ref<T> = React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null;

/**
 * Used to merge multiple React refs into a single callback ref.
 *
 * @example
 * ```tsx
 * <div ref={mergeRefs([ref, forwardedRef])} />
 * ```
 */
export function mergeRefs<T>(refs: Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      // If the ref is a function, it's a callback ref and we call it with the value.
      if (Helpers.isFunction(ref)) {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        // If the ref is an object (not null and not undefined), it's an object ref.
        // We assign the value to its 'current' property.
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
