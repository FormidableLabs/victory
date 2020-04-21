import * as React from "react";
import {
  EventCallbackInterface,
  EventPropTypeInterface,
  StringOrNumberOrCallback
} from "victory-core";

export type VictorySharedEventsProps = {
  groupComponent?: React.ReactElement;
  events?: EventPropTypeInterface<string, StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  externalEventMutations?: EventCallbackInterface<
    string | string[],
    string | number | (string | number)[]
  >[];
};

export class VictorySharedEvents extends React.Component<VictorySharedEventsProps, any> {}
