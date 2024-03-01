import Page, { generateMetadata } from "@/app/docs/[[...slug]]/page";
import { getDocsPageContent } from "@/content/data";
import { staticPathPrefix } from '@/content/path';

async function generateStaticParams() {
  const { sidebarList } = await getDocsPageContent();

  return sidebarList
    .filter((x) => x.data.type === "guides")
    .map((x) => ({
      slug: staticPathPrefix(x.data.slug).split("/"),
    }));
}

export default Page;
export { generateMetadata, generateStaticParams };
