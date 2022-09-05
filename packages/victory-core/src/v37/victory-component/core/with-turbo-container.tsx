import React, { JSXElementConstructor } from "react";
import { Clone } from "../../clone";
import { NestableParent } from "./nestable-component";
import { VictoryCommonProps } from "../../../victory-util";
import { TurboCommonProps } from "../utils/props";
import { satisfies } from "../utils/satisfies";

/* eslint-disable react/no-multi-comp */

export type TurboContainerProps = TurboCommonProps &
  Required<Pick<VictoryCommonProps, "containerComponent">>;

const TurboContainerContext = React.createContext<boolean>(false);

export function withTurboContainer<TProps>(
  Component: JSXElementConstructor<TProps>,
) {
  const WithTurboContainer = (props: TurboContainerProps & TProps) => {
    const {
      // Split out all the containerProps:
      containerComponent,
      width,
      padding,
      theme,
      title,
      height,
      ...rest
    } = props;
    // @ts-expect-error "TProps could be instantiated with an arbitrary type"
    const componentProps = rest as TProps;

    const hasContainer = React.useContext(TurboContainerContext);

    if (hasContainer) {
      // The component is already nested, so we can pass through:
      return <Component {...componentProps} />;
    }

    // Use 'satisfies' to ensure we've included all container fields:
    const containerProps = satisfies<Required<TurboCommonProps>>()({
      width,
      padding,
      theme,
      title: title!,
      height,
    });

    return (
      <TurboContainerContext.Provider value>
        <NestableParent>
          <Clone element={containerComponent} {...containerProps}>
            <Component {...componentProps} />
          </Clone>
        </NestableParent>
      </TurboContainerContext.Provider>
    );
  };

  return WithTurboContainer;
}
