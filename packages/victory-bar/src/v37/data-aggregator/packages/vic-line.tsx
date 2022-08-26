import React from "react";
export type VicLineProps<TDatum> = {
  data: TDatum[];
  polar?: boolean;
};
export const VicLine = <TDatum,>(props: VicLineProps<TDatum>) => {
  return <fieldset>VicLine {JSON.stringify(props)}</fieldset>;
};
