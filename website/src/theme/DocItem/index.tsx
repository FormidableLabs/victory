import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import CalloutBanner from "@site/src/components/CalloutBanner";

export default function DocItem(props) {
  return (
    <>
      <OriginalDocItem {...props} />
      <div className="mt-20 min-[997px]:hidden">
        <CalloutBanner fullWidth />
      </div>
    </>
  );
}
