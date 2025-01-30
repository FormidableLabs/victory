import React, { useState } from "react";

import { Button } from "@site/src/components/button";
import { useClickOutside } from "@site/src/hooks/useClickOutside";
import { Options } from "./options";

export function Header() {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const ref = useClickOutside(() => {
    setIsSettingsMenuOpen((prev) => !prev);
  });

  const handlePreviewClick = () => {
    setIsSettingsMenuOpen((prev) => !prev);
  };

  return (
    <div className="border-b border-gray-200 pb-3 mb-6 sm:flex sm:items-center sm:justify-between">
      <h3 className="mb-0 font-semibold text-gray-900">Chart Previews</h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <Button onClick={handlePreviewClick}>Preview Options</Button>
        <Options isOpen={isSettingsMenuOpen} ref={ref} />
      </div>
    </div>
  );
}
