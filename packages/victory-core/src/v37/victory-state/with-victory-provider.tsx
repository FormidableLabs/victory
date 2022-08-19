import * as React from "react";
import { useVictoryContextMaybe, VictoryProvider } from "./victory-provider";
import { VictoryCommonProps } from "../../victory-util/common-props";
import { Clone } from "../clone";
import { VictoryProviderProps } from "./types";

/* eslint-disable react/prop-types */

/**
 * Ensures the component is wrapped by a VictoryProvider, if not already.
 */
export function withVictoryProvider<
  TComp extends React.FC<TProps>,
  TProps extends React.PropsWithChildren<VictoryCommonProps>,
>(Comp: TComp): TComp {
  const WithVictoryProvider = React.memo((props: TProps) => {
    const updateChildProps = useVictoryContextMaybe(
      (value) => value?.updateChildProps,
    );
    const hasParentProvider = !!updateChildProps;

    React.useEffect(() => {
      if (!hasParentProvider) return;

      const id = Symbol("WithVictoryProvider");
      updateChildProps(id, props as VictoryProviderProps);
      // eslint-disable-next-line consistent-return
      return () => updateChildProps(id, null);
    });

    // @ts-expect-error "TProps not assignable to LibraryManagedAttributes"
    let result = <Comp {...props}>{props.children}</Comp>;

    if (!hasParentProvider) {
      // Wrap with a parent Provider:
      result = (
        <VictoryProvider>
          <Clone element={props.containerComponent} {...props}>
            {result}
          </Clone>
        </VictoryProvider>
      );
    }
    return result;
  });
  const name = Comp.displayName || Comp.name;
  WithVictoryProvider.displayName = name
    ? `WithVictoryProvider(${name})`
    : "WithVictoryProvider";

  // @ts-expect-error "WithVictoryProvider does not overlap with TComp"
  return WithVictoryProvider as TComp;
}
