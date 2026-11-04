import React from "react";

// Shows a story's error in place of the story, so the gallery keeps working.
// A class: React has no hook for error boundaries.
export class StoryErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    return error ? (
      <pre className="error">{error.stack ?? String(error)}</pre>
    ) : (
      this.props.children
    );
  }
}
