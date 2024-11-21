import * as React from "react";
import * as ReactDOM from "react-dom";

import ThemeBuilder from "./components/theme-builder";

interface AppState {
  route: string;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  fontFamily: "sans-serif",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  overflow: "hidden",
  flex: 1,
};

class App extends React.Component<any, AppState> {
  render() {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <ThemeBuilder />
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById("content"));
