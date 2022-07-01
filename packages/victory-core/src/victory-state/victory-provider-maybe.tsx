import { VictoryProviderProps } from "./types";
import { useContextSelector } from "use-context-selector";
import * as React from "react";
import {
  useHasVictoryContext,
  useVictoryContext,
  VictoryProvider,
} from "./victory-provider";

export function VictoryProviderMaybe(props: VictoryProviderProps) {
  const hasParentProvider = useHasVictoryContext();
  if (!hasParentProvider) {
    return <VictoryProvider {...props}>{props.children}</VictoryProvider>;
  }
  return (
    <VictoryProviderChild {...props}>{props.children}</VictoryProviderChild>
  );
}

export function VictoryProviderChild(props: VictoryProviderProps) {
  const setChildProps = useVictoryContext((value) => value.setChildProps);

  React.useEffect(() => {
    setChildProps("TODO: UPDATE THIS ID", props);
  }, []);

  return <>{props.children}</>;
}

export function withProvider<TComp extends React.FC<any>>(Comp: TComp): TComp {
  type TProps = TComp extends React.FC<infer P> ? P : never;
  const WithProvider = (props: TProps) => {
    return (
      <VictoryProviderMaybe {...props}>
        <Comp {...props}>{props.children}</Comp>
      </VictoryProviderMaybe>
    );
  };
  return WithProvider as TComp;
}
