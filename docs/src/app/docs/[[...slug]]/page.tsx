import { Metadata } from "next";
import { redirect } from "next/navigation";
import config from "@/static-config-helpers/site-data";

import { Content } from "./content";
import { getDocsPageContent } from "@/content/data";
import { staticPathPrefix } from "@/content/path";

interface Props {
  params: {
    slug?: string[];
  };
}

export default async function Docs({ params }: Props) {
  const slug = params.slug?.join("/");
  const { content } = await getDocsPageContent(slug);

  if (!content) {
    redirect("/docs");
  }

  // NOTE: JSON magic is required when passing data to client components
  return <Content doc={JSON.parse(JSON.stringify(content))} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.join("/");
  const { content } = await getDocsPageContent(slug);

  return {
    title: `${config.siteTitle} | ${content.data.title}`,
    description: content.data.description || config.siteDescription,
  };
}

export async function generateStaticParams() {
  const { sidebarList } = await getDocsPageContent();

  return sidebarList
    .filter((x) => x.data.type === "docs")
    .map((x) => ({
      slug: staticPathPrefix(x.data.slug).split("/"),
    }));
}
