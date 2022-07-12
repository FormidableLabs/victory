import * as React from "react";
import { useVictoryContextMaybe, VictoryProvider } from "./victory-provider";
// TODO: Fix this dependency:
import { VictoryCommonProps, Clone } from "../victory-util";

type ContainerProp = Required<Pick<VictoryCommonProps, "containerComponent">>;

/* eslint-disable react/prop-types */

export function withVictoryProvider<
  TComp extends React.FC<TProps>,
  TProps extends React.PropsWithChildren<ContainerProp>,
>(Comp: TComp): TComp {
  const WithProvider = React.memo((props: TProps) => {
    const updateChildProps = useVictoryContextMaybe(
      (value) => value?.updateChildProps,
    );
    const hasParentProvider = !!updateChildProps;

    React.useEffect(() => {
      if (!hasParentProvider) return;

      const id = Symbol("WithProvider");
      updateChildProps(id, props);
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
  WithProvider.displayName = `WithProvider(${Comp.displayName || Comp.name})`;

  // @ts-expect-error "WithProvider does not overlap with TComp"
  return WithProvider as TComp;
}
