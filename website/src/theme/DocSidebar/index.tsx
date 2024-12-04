import React from "react";
import OriginalDocSidebar from "@theme-original/DocSidebar";
import SidebarLeadBanner from "@site/src/components/SidebarLeadBanner";

export default function DocSidebar(props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-x-hidden">
        <OriginalDocSidebar {...props} />
      </div>
      <SidebarLeadBanner />
    </div>
  );
}
