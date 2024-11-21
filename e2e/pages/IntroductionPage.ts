import { Locator, Page } from '@playwright/test'

export class IntroPage {
  readonly page: Page
  readonly breadcrumbsLabel: (labelName: string) => Locator
  readonly homePageIcon: Locator
  readonly pageTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.breadcrumbsLabel = (labelname: string) => 
        this.page.getByLabel('Breadcrumbs').getByText(labelname) 
    this.homePageIcon = this.page.getByLabel('Home page')
    this.pageTitle = this.page.getByRole('heading', { name: 'Getting Started with Victory' })
  }

  async goto() {
    await this.page.goto('http://localhost:5855/open-source/victory/docs/introduction/')
  }
}
