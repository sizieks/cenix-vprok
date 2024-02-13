const fs = require('fs');
const puppeteer = require('puppeteer');
const { argv } = require('node:process');
const { selectors } = require('./selectors');
const { stringifyObject } = require('./utils');

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`${argv[2]}`, { timeout: 60000 });
  await page.click('[class^="Region_region"]');
  await page.waitForSelector('[class^="UiRegionListBase_list"]');
  await Promise.all([
    page.waitForNavigation({ timeout: 60000 }),
    page.click(`[class^="UiRegionListBase_item"] ::-p-text(${argv[3]})`),
  ]);
  const [price, priceOld, rating, reviewCount] = await Promise.all([
    page.$eval(
      `${selectors.price.regular}, ${selectors.price.discount}`,
      (el) => +el?.textContent.replace(/[^\d,]/g, '').replace(',', '.')
    ),
    page.$eval(
      `${selectors.price.old}`,
      (el) => +el?.textContent.replace(/[^\d,]/g, '').replace(',', '.') || null
    ),
    page.$eval(`${selectors.rating}`, (el) => +el?.textContent || 0),
    page.$eval(
      `${selectors.reviewCount}`,
      (el) => +el?.textContent.split(' ')[0] || 0
    ),
  ]);
  fs.writeFileSync(
    'product.txt',
    stringifyObject({ price, priceOld, rating, reviewCount })
  );
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
});
