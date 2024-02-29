"use client";

import React from "react";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import Link from "next/link";
import * as Victory from "victory";
// NOTE(2220): Keep on old CommonJS-supported D3 versions
// https://github.com/FormidableLabs/victory/issues/2220
import * as d3Scale from "d3-scale";
import {
  scaleDiscontinuous,
  discontinuitySkipWeekends,
} from "@d3fc/d3fc-discontinuous-scale";
import { LiveProvider, LivePreview } from "react-live";
import { themes } from "prism-react-renderer";

import StyledLayout from "@/layouts/styled-page";

import Page from "@/partials/page";
import Slider from "@/partials/gallery/slider";
import basketballData from "@/data/basketball-data";
import listeningData from "@/data/listening-data";
import LazyRender from "@/partials/lazy-render";
import { RemarkDocument } from "../../static-config-helpers/remark-document";

const Title = styled.h2`
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.color.darkBrown};
  text-align: center;
  margin-top: 2.5rem;
`;

const PageHeader = styled.h1`
  font-family: ${({ theme }) => theme.font.bold};
  margin-top: 0;
  margin-bottom: 2rem;
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.nearWhite};
  margin: 3rem 0;
`;

interface GalleryProps {
  gallery: RemarkDocument[];
}

const parseRaw = (str: string) => {
  const playground = "playground_norender";
  const start = str.indexOf(playground) + playground.length;
  const end = str.indexOf("```", start);
  return str.slice(start, end);
};

const renderPreviewItem = (item: any) => {
  const slug = item.data.slug;
  const title = item.data.title;

  const code = parseRaw(item.content);
  const scope = {
    ...Victory,
    _: require("lodash"),
    styled,
    React,
    ReactDOM,
    createRoot,
    createPortal,
    Slider,
    basketballData,
    listeningData,
    d3Scale,
    scaleDiscontinuous,
    discontinuitySkipWeekends,
  };

  return (
    <>
      <LazyRender
        className="feature-img border border-6 p-8 overflow-hidden w-[200px] h-[200px]"
        LazyRenderedComponent={() => (
          <LiveProvider
            code={code}
            scope={scope}
            noInline={true}
            theme={themes.oneLight}
          >
            <LivePreview />
          </LiveProvider>
        )}
      />
      <Link href={`gallery/${slug}`}>
        <Title>{title}</Title>
      </Link>
    </>
  );
};

export const Content = ({ gallery }: GalleryProps) => {
  const previews = gallery.map((item, index) => (
    <div key={index}>{renderPreviewItem(item)}</div>
  ));

  return (
    <StyledLayout>
      <Page>
        <PageHeader>Victory Gallery</PageHeader>
        <p>
          Here are some examples to help you get started. Each example below
          links to a live, editable playground. Code samples provided in these
          examples are free to use or modify however you like.
        </p>
        <Divider />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">{previews}</div>
      </Page>
    </StyledLayout>
  );
};
