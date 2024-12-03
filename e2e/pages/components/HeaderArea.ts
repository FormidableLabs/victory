import { Locator, Page } from "@playwright/test";

export class HeaderPage {
  readonly page: Page;
  readonly leftSideNavLink: (linkName: string) => Locator;
  readonly rightSideNavLink: (linkName: string) => Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leftSideNavLink = (linkName: string) =>
      this.page.getByRole("link", { name: linkName });
    this.rightSideNavLink = (linkName: string) =>
      this.page.getByLabel(linkName);
    this.searchInput = this.page.getByPlaceholder("Search");
  }
}
