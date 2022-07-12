import * as React from "react";
import { useVictoryContextMaybe, VictoryProvider } from "./victory-provider";
// TODO: Fix this dependency:
import { Clone } from "victory-line/src/v37/clone";

export function withVictoryProvider<
  TComp extends React.FC<TProps>,
  TProps extends { children?: React.ReactNode | undefined },
>(Comp: TComp): TComp {
  const WithProvider = React.memo((props: TProps) => {
    const setChildProps = useVictoryContextMaybe(
      (value) => value?.setChildProps,
    );
    const hasParentProvider = !!setChildProps;

    React.useEffect(() => {
      if (!hasParentProvider) return;

      const id = Symbol("WithProvider");
      setChildProps(id, props);
      // eslint-disable-next-line consistent-return
      return () => setChildProps(id, null);
    });

    //// @ts-expect-error "Comp something something..."
    const result = <Comp {...props}>{props.children}</Comp>;

    if (!hasParentProvider) {
      return (
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
  return WithProvider as TComp;
}
