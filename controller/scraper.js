const puppeteer = require("puppeteer");

async function scrapeCourses(limit = 10) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://openclassrooms.com/fr/courses", {
    waitUntil: "networkidle2",
  });

  const courses = await page.evaluate((limit) => {
    const items = [];

    const courseContainers = document.querySelectorAll("h2.MuiTypography-h6");

    for (let i = 0; i < courseContainers.length && items.length < limit; i++) {
      const title = courseContainers[i].innerText.trim();

      const card = courseContainers[i].closest("a, div[href]");

      const href = card?.getAttribute("href");

      // Recherche de l'image (figure -> style="background-image: url(...)")
      const figure = card?.querySelector("figure");
      let imageUrl = "";

      if (figure) {
        const style = figure.getAttribute("style");
        const match = style.match(/url\("?(.*?)"?\)/);
        if (match && match[1]) {
          imageUrl = match[1];
        }
      }

      if (title && href && href.startsWith("/fr/courses/")) {
        items.push({
          title,
          link: "https://openclassrooms.com" + href,
          image: imageUrl,
        });
      }
    }

    return items;
  }, limit);

  await browser.close();
  return courses;
}

// Test local
scrapeCourses().then(console.log).catch(console.error);

module.exports = { scrapeCourses };
