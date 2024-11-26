import { test, expect } from '@chromatic-com/playwright'
import { IntroPage } from './pages/IntroductionPage';

test('should load intro page', async ({ page }) => {
  const introPage = new IntroPage(page)
  await introPage.goto()
  await expect(introPage.pageTitle).toBeVisible()
  await expect(introPage.homePageIcon).toBeVisible()
  await expect(introPage.breadcrumbsLabel('Introduction')).toBeVisible()
  await expect(introPage.breadcrumbsLabel('Getting Started')).toBeVisible()
})
