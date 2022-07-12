import * as React from "react";
import { useVictoryContextMaybe, VictoryProvider } from "./victory-provider";
// TODO: Fix this dependency:
import { Clone } from "victory-line/src/v37/clone";
import { VictoryCommonProps } from "../victory-util";

type ContainerProp = Required<
  Pick<VictoryCommonProps, "containerComponent">
>;
type ChildrenProp = { children?: React.ReactNode | undefined };

export function withVictoryProvider<
  TComp extends React.FC<TProps>,
  TProps extends ChildrenProp & ContainerProp,
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
