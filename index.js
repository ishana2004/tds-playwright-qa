const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [49,50,51,52,53,54,55,56,57,58];

  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://exam.sanand.workers.dev/tds-2026-01-ga3?seed=${seed}`;

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait a little extra to ensure JS rendering finishes
    await page.waitForTimeout(3000);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseInt(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);

    grandTotal += pageTotal;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
