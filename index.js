const express = require("express");
const puppeteer = require("puppeteer");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

async function scrapeBooks() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/");

    let books = await page.evaluate(() => {
      const headings_elements = document.querySelectorAll(".product_pod");
      const headings_array = Array.from(headings_elements);
      return headings_array.map((heading) => {
        return {
          name: heading.querySelector("h3 a").textContent.trim(),
          price: heading
            .querySelector(".product_price .price_color")
            .textContent.trim(),
          availability: heading.querySelector(".instock").textContent.trim(),
        };
      });
    });
    console.log(books);

    await browser.close();
    return books;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Schedule the scraping to run every 8 hours
cron.schedule("0 */8 * * *", async () => {
  console.log("Running the scrapeBooks job...");
  await scrapeBooks();
});

app.get("/scrape-books", async (req, res) => {
  const books = await scrapeBooks();
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
