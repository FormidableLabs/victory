import React from "react";
import Control from "./control";
import PanelHeader from "./panel-header";
import { OptionsPanelConfig } from "../_config";

type GlobalPanelProps = {
  config: OptionsPanelConfig;
};

const OptionsPanel = ({
  config: { title, description, controls },
}: GlobalPanelProps) => {
  return (
    <>
      <PanelHeader title={title} description={description} />
      {controls.map((control, i) => {
        return (
          <Control
            key={control.label + i}
            type={control.type}
            control={control}
            className="my-4"
          />
        );
      })}
    </>
  );
};
export default OptionsPanel;
