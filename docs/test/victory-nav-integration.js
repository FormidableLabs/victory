const puppeteer = require("puppeteer");
const path = require("path");

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("http://localhost:3000/open-source/victory/");
    const links = ["about", "docs", "docs/faq", "guides", "gallery"];
    const markdownEndpoints = ["docs", "docs/faq", "guides"];
    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      await page.click(`[href='/open-source/victory/${l}/']`);
      await page.waitFor(3000);
      if (markdownEndpoints.includes(l)) {
        const heading = await page.waitForSelector(".Recipe h1");
        if (!heading) {
          throw new Error(
            `Expected Markdown did not render as expected for route ${l}!`
          );
        }
      }
      await page.screenshot({
        path:
          path.basename(process.cwd()) === "test"
            ? `screenshots/${l}.png`
            : `test/screenshots/${l}-victory.png`,
        type: "png"
      });
      console.log(`See resolved route screenshot at screenshots/${l}-victory`);
    }
    // we can do these too, but really validating that they exist is probably sufficient, lemme know!
    // const externalLinks = ["https://gitter.im/FormidableLabs/victory", "https://github.com/FormidableLabs/victory"];
    // for (let i = 0; i < externalLinks.length; i++) {
    //   const l = links[i];
    //   await page.click(`[href='${l}']`);
    //   await page.waitFor(2000);
    //   await page.goBack();
    // }
    await browser.close();
  })();
} catch (err) {
  throw err;
}
