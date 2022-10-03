import { test, expect } from '@playwright/test'

test('test incorrect url', async ({ page }) => {
// Go to http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7
  await page.goto('http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7')

  // Click input[name="link"]
  await page.locator('input[name="link"]').click()

  // Fill input[name="link"]
  await page.locator('input[name="link"]').fill('asdasd')

  // Click text=Description
  await page.locator('text=Description').click()

  // Click input[name="description"]
  await page.locator('input[name="description"]').click()

  // Fill input[name="description"]
  await page.locator('input[name="description"]').fill('no es una url')

  // Click button:has-text("Create link")
  await page.locator('button:has-text("Create link")').click()

  // Click text=Invalid URL
  await expect(page.locator('text=Invalid URL')).toBeVisible()
})

test('test description is required', async ({ page }) => {
  // Go to http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7
  await page.goto('http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7')

  // Click input[name="link"]
  await page.locator('input[name="link"]').click()

  // Fill input[name="link"]
  await page.locator('input[name="link"]').fill('https://almanac.httparchive.org/es/2022/table-of-contents')

  // Click text=Description
  await page.locator('text=Description').click()

  // Click input[name="description"]
  await page.locator('input[name="description"]').click()

  // Fill input[name="description"]
  await page.locator('input[name="description"]').fill('')

  // Click button:has-text("Create link")
  await page.locator('button:has-text("Create link")').click()

  // Click text=Invalid URL
  await expect(page.locator('text=Description is required')).toBeVisible()
})

test('test create link successfully', async ({ page }) => {
  // Go to http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7
  await page.goto('http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7')

  // Click input[name="link"]
  await page.locator('input[name="link"]').click()

  // Fill input[name="link"]
  await page.locator('input[name="link"]').fill('https://almanac.httparchive.org/es/2022/table-of-contents')

  // Click text=Description
  await page.locator('text=Description').click()

  // Click input[name="description"]
  await page.locator('input[name="description"]').click()

  // Fill input[name="description"]
  await page.locator('input[name="description"]').fill('js almanac')

  // Click button:has-text("Create link")
  await page.locator('button:has-text("Create link")').click()

  // expect empty input
  const locatorInputLink = page.locator('input[name="link"]')
  const locatorInputDescription = page.locator('input[name="description"]')

  await expect(locatorInputLink).toContainText('')
  await expect(locatorInputDescription).toContainText('')
})
