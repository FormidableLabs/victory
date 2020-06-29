const puppeteer = require("puppeteer");
const path = require("path");

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("http://localhost:3000/open-source/victory/");
    const links = [
      "about",
      "work",
      "careers",
      "open-source",
      "blog",
      "contact"
    ];
    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      await page.click(`[href='https://formidable.com/${l}']`);
      await page.waitFor(2500);
      await page.screenshot({
        path:
          path.basename(process.cwd()) === "test"
            ? `screenshots/${l}.png`
            : `test/screenshots/${l}-formidable.png`,
        type: "png"
      });
      await page.goBack();
      console.log(
        `See resolved route screenshot at screenshots/${l}-formidable`
      );
    }
    await browser.close();
  })();
} catch (err) {
  throw err;
}
