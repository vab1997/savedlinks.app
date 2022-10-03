import { test } from '@playwright/test'

test('test', async ({ page }) => {
  // go to http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7
  await page.goto('http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7')

  // Click input[name="link"]
  await page.locator('input[name="link"]').click()

  // Fill input[name="link"]
  await page.locator('input[name="link"]').fill('https://epicreact.dev/improve-the-performance-of-your-react-forms/')

  // Click input[name="description"]
  await page.locator('input[name="description"]').click()

  // Fill input[name="description"]
  await page.locator('input[name="description"]').fill('Improve the Performance of your React Forms')

  // Click button:has-text("Create link")
  await page.locator('button:has-text("Create link")').click()

  // Click button:has-text("post KCD")
  await page.locator('button:has-text("post KCD")').click()

  // Click text=https://epicreact.dev/why-react-needs-a-key-prop/why react needs a key propsQR >> button[role="none"] >> nth=1
  await page.locator('text=https://epicreact.dev/why-react-needs-a-key-prop/why react needs a key propsQR >> button[role="none"]').nth(1).click()

  // Click text=Code QR Got it >> path >> nth=0
  await page.locator('text=Code QR Got it >> path').first().click()
})
