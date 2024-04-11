// @ts-nocheck - until we convert all components to TypeScript

"use client";

import Markdown from "@/partials/markdown";
import { RemarkDocument } from "@/static-config-helpers/remark-document";

interface ContentProps {
  doc: RemarkDocument;
}

export const Content = ({ doc }: ContentProps) => {
  const { content, data } = doc;
  const { scope } = data;

  return <Markdown source={content} scope={scope} />;
};
