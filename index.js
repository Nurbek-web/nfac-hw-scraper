const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/");

    let books = await page.evaluate(() => {
      headings_elements = document.querySelectorAll(".product_pod ");
      headings_array = Array.from(headings_elements);
      return headings_array.map((heading) => {
        return {
          name: heading.querySelector("h3 a").textContent,
          price: heading.querySelector(".product_price .price_color")
            .textContent,
          price: heading.querySelector(".product_price .price_color")
            .textContent,
          availability: heading.querySelector(".instock").textContent,
        };
        // .querySelector("a")
        // .querySelector("img")
        // .getAttribute("src");
      });
    });
    console.log(books);

    browser.close();
  } catch (error) {
    console.error("Error:", error);
  }
})();
