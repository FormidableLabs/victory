"use client";

import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";

import StyledLayout from "./styled-page";

const PageContainer = styled.main`
  position: relative;
  margin-left: ${({ theme }) => theme.layout.stripesWidth};
  margin-top: ${({ theme }) => theme.layout.headerHeight};

  @media ${({ theme }) => theme.mediaQuery.md} {
    margin-left: ${({ theme }) =>
      `calc(${theme.layout.stripesWidth} + ${theme.layout.sidebarWidth})`};
  }
`;

interface Props {
  children: React.ReactNode;
  data: any[];
}

export default function Layout({ children }: Props) {
  return (
    <StyledLayout>
      {/* page column */}
      <PageContainer>
        {/* page header */}
        <div>Header</div>

        {/* body */}
        <div>
          {/* sidebar */}
          <div>Sidebar</div>

          {/* page content */}
          <div>{children}</div>
        </div>
      </PageContainer>
    </StyledLayout>
  );
}
