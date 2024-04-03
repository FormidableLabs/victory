import StyledLayout from "@/layouts/styled-page";

import { getDocsPageContent } from "@/content/data";
import Page from "@/partials/page";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarList } = await getDocsPageContent();

  return (
    <StyledLayout>
      <Page
        withSidebar
        sidebarContent={JSON.parse(JSON.stringify(sidebarList))}
      >
        {children}
      </Page>
    </StyledLayout>
  );
}
