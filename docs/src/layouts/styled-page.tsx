"use client";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
