const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/test.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test_globe.png' });
  await browser.close();
})();