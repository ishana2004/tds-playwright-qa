const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    "https://sanand0.github.io/tdsdata/seed49.html",
    "https://sanand0.github.io/tdsdata/seed50.html",
    "https://sanand0.github.io/tdsdata/seed51.html",
    "https://sanand0.github.io/tdsdata/seed52.html",
    "https://sanand0.github.io/tdsdata/seed53.html",
    "https://sanand0.github.io/tdsdata/seed54.html",
    "https://sanand0.github.io/tdsdata/seed55.html",
    "https://sanand0.github.io/tdsdata/seed56.html",
    "https://sanand0.github.io/tdsdata/seed57.html",
    "https://sanand0.github.io/tdsdata/seed58.html"
  ];

  let total = 0;

  for (let url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval("td", cells =>
      cells
        .map(td => parseInt(td.innerText))
        .filter(n => !isNaN(n))
    );

    total += numbers.reduce((a, b) => a + b, 0);
  }

  console.log("FINAL TOTAL:", total);

  await browser.close();
})();
