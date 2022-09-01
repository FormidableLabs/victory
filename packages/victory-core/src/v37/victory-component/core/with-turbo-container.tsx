import React, { JSXElementConstructor } from "react";
import { Clone } from "../../clone";
import { NestableParent } from "./nestable-component";
import { VictoryCommonProps } from "../../../victory-util";

/* eslint-disable react/no-multi-comp */

const TurboContainerExists = React.createContext(false);

export type TurboContainerProps = React.PropsWithChildren<
  Required<Pick<VictoryCommonProps, "containerComponent">>
>;

export function withTurboContainer<TProps extends TurboContainerProps>(
  Component: JSXElementConstructor<TProps>,
) {
  const WithTurboContainer = (props: TProps) => {
    const hasVictoryContainer = React.useContext(TurboContainerExists);

    const standaloneComponent = (
      <Component {...props}>{props.children}</Component>
    );

    if (hasVictoryContainer) {
      return standaloneComponent;
    }

    return <TurboContainer {...props}>{standaloneComponent}</TurboContainer>;
  };
  WithTurboContainer.displayName = `WithVictoryContainer`;

  return WithTurboContainer;
}

function TurboContainer(props: TurboContainerProps) {
  return (
    <TurboContainerExists.Provider value>
      <NestableParent>
        <Clone element={props.containerComponent} {...props}>
          {props.children}
        </Clone>
      </NestableParent>
    </TurboContainerExists.Provider>
  );
}
