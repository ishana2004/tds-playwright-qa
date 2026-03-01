const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [49,50,51,52,53,54,55,56,57,58];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://exam.sanand.workers.dev/tds-2026-01-ga3?seed=${seed}`;
    
    await page.goto(url, { waitUntil: 'networkidle' });

    await page.waitForSelector('table');

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => cell.innerText.trim())
        .map(text => Number(text))
        .filter(num => !isNaN(num))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageTotal;
  }

  console.log(grandTotal);

  await browser.close();
})();
