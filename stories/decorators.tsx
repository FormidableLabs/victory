import React from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

export const storyContainer = (story: any) => (
  <div style={containerStyle}>{story()}</div>
);
