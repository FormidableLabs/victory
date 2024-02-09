type Ref<T> = React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null;

export function mergeRefs<T>(refs: Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
