import React, { JSXElementConstructor } from "react";
import { Clone } from "../../clone";
import { NestableParent } from "./nestable-component";
import { VictoryCommonProps } from "../../../victory-util";

/* eslint-disable react/no-multi-comp */

const TurboContainerExists = React.createContext(false);

export type TurboContainerProps = Required<
  Pick<VictoryCommonProps, "containerComponent">
>;

export function withTurboContainer<TProps extends TurboContainerProps>(
  Component: JSXElementConstructor<TProps>,
) {
  const WithTurboContainer = (props: TProps) => {
    const hasVictoryContainer = React.useContext(TurboContainerExists);

    const standaloneComponent = <Component {...props} />;

    if (hasVictoryContainer) {
      return standaloneComponent;
    }

    return <TurboContainer {...props}>{standaloneComponent}</TurboContainer>;
  };
  return WithTurboContainer;
}

function TurboContainer(props: React.PropsWithChildren<TurboContainerProps>) {
  return (
    <TurboContainerExists.Provider value>
      <NestableParent>
        <Clone element={props.containerComponent} {...props} />
      </NestableParent>
    </TurboContainerExists.Provider>
  );
}
