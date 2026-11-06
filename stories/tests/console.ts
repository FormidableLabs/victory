import { vi } from "vitest";

// Records `console.error` and `console.warn` calls (React's warnings
// included), and still logs them. The markup and interaction tests fail on
// any. Undo with `vi.restoreAllMocks()`.
export const recordConsole = () => {
  const messages: string[] = [];
  for (const method of ["error", "warn"] as const) {
    const original = console[method];
    vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
      messages.push(`console.${method}: ${args.map(String).join(" ")}`);
      original(...args);
    });
  }
  return messages;
};
