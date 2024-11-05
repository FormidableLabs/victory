import React from "react";

const containerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
  gridRowGap: "1rem",
};

export const componentContainer = (story: any) => (
  <div style={containerStyle}>{story()}</div>
);
