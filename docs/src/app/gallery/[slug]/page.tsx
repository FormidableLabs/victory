import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getGallery } from "@/static-config-helpers/md-data-transforms";
import config from "@/static-config-helpers/site-data";

import { Content } from "./gallery-item";
import { RemarkDocument } from '@/static-config-helpers/remark-document';

interface Props {
  params: {
    slug: string;
  };
}

export default async function GalleryItem({ params }: Props) {
  const gallery = await getGallery();
  const content = gallery.find((x: any) => x.data.slug === params.slug);

  if (!content) {
    redirect("/gallery");
  }

  return <Content item={JSON.parse(JSON.stringify(content))} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gallery = await getGallery();
  const content = gallery.find((x: any) => x.data.slug === params.slug);

  return {
    title: `${config.siteTitle} | ${content.data.title}`,
    description: content.data.description || config.siteDescription,
  };
}

export async function generateStaticParams() {
  const gallery = await getGallery();

  return gallery.map((x: RemarkDocument) => ({
    slug: x.data.slug,
  }));
}
