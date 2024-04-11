// @ts-nocheck - until we convert all components to TypeScript

"use client";

import Link from "next/link";

import StyledLayout from "@/layouts/styled-page";

import Markdown from "@/partials/markdown";
import Page from "@/partials/page";
import { RemarkDocument } from "@/static-config-helpers/remark-document";

interface ContentProps {
  item: RemarkDocument;
}

export const Content = ({ item }: ContentProps) => {
  const { content, data } = item;
  const { description, title, scope } = data;

  return (
    <StyledLayout>
      <Page>
        <Link href="/gallery">Back to Gallery</Link>
        <h1>{title}</h1>
        <p>{description}</p>
        <Markdown source={content} scope={scope} />
      </Page>
    </StyledLayout>
  );
};
