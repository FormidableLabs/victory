import { Locator, Page } from '@playwright/test'

export class FooterPage {
  readonly page: Page
  readonly nearformLogo: Locator
  readonly copyrightText: Locator

  constructor(page: Page) {
    this.page = page
    this.nearformLogo = this.page.getByRole('link', { name: 'Nearform logo' })
    this.copyrightText = this.page.getByText('Copyright © 2013-2024 Nearform')
  }
}
