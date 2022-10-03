import { test } from '@playwright/test'

test('test show qr code', async ({ page }) => {
  // go to http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7
  await page.goto('http://localhost:3000/manage-link/1a90eca7-0887-4b07-ad45-45b9129e4fc7')

  // Click button:has-text("thread twitter")
  await page.locator('button:has-text("thread twitter")').click()

  // Click text=QR >> nth=0
  await page.locator('text=QR').first().click()

  // Click text=Code QR Got it >> path >> nth=0
  await page.locator('text=Code QR Got it >> path').first().click()
})
