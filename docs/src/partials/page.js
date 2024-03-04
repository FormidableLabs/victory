'use client';

import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import _Header from "./header";
import _Sidebar from "../partials/sidebar";

const PageContainer = styled.main`
  position: relative;
  margin-left: ${({ theme }) => theme.layout.stripesWidth};
  margin-top: ${({ theme }) => theme.layout.headerHeight};

  @media ${({ theme }) => theme.mediaQuery.md} {
    margin-left: ${({ $spaceForSidebar, theme }) =>
      `calc(${theme.layout.stripesWidth} + ${
        $spaceForSidebar ? theme.layout.sidebarWidth : "0rem"
      })`};
  }
`;

const Header = styled(_Header)`
  left: ${({ theme }) => theme.layout.stripesWidth};
  position: fixed;
  top: 0;
  width: ${({ theme }) => `calc(100% - ${theme.layout.stripesWidth})`};
  z-index: 4;

  @media ${({ theme }) => theme.mediaQuery.md} {
    left: ${({ spaceForSidebar, theme }) =>
      `calc(${theme.layout.stripesWidth} + ${
        spaceForSidebar ? theme.layout.sidebarWidth : "0rem"
      })`};
    width: ${({ spaceForSidebar, theme }) =>
      `calc(100% - ${theme.layout.stripesWidth} - ${
        spaceForSidebar ? theme.layout.sidebarWidth : "0rem"
      })`};
  }
`;

const SidebarContainer = styled.aside`
  display: flex;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
`;

const stripeStyle = css`
  height: 100%;
  width: ${({ theme }) => `calc(${theme.layout.stripesWidth} / 2)`};
`;

const RedStripe = styled.div`
  ${stripeStyle}
  background-color: ${({ theme }) => theme.color.red};
`;

const PaleRedStripe = styled.div`
  ${stripeStyle}
  background-color: ${({ theme }) => theme.color.paleRed};
`;

const Sidebar = styled(_Sidebar)`
  display: ${({ show }) => (show ? "block" : "none")};

  @media ${({ theme }) => theme.mediaQuery.md} {
    display: ${({ showMd }) => (showMd ? "block" : "none")};
  }
`;

const ContentContainer = styled.article`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.layout.pageGutterTop} ${theme.layout.pageGutterRight} ${theme.layout.pageGutterBottom} ${theme.layout.pageGutterLeft}`};

  @media ${({ theme }) => theme.mediaQuery.md} {
    padding: ${({ theme }) =>
      `${theme.layout.md.pageGutterTop} ${theme.layout.md.pageGutterRight} ${theme.layout.md.pageGutterBottom} ${theme.layout.md.pageGutterLeft}`};
  }
`;

const Content = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  width: 100%;
`;

const Page = (props) => {
  const { children, sidebarContent, withSidebar } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ref = useRef();

  const handleOutsideClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      sidebarOpen === true
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <PageContainer $spaceForSidebar={withSidebar} className="Page-content">
      <Header
        spaceForSidebar={withSidebar}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <SidebarContainer ref={ref}>
        <RedStripe />
        <PaleRedStripe />
        <Sidebar
          show={sidebarOpen}
          showMd={withSidebar}
          content={sidebarContent}
          onCloseClick={() => setSidebarOpen(false)}
        />
      </SidebarContainer>

      <ContentContainer>
        <Content>{children}</Content>
      </ContentContainer>
    </PageContainer>
  );
};

export default Page;
