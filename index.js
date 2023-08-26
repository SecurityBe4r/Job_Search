import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.stepstone.de/jobs/python-developer?action=facet_selected%3bage%3bage_1&ag=age_1", {
    waitUntil: "domcontentloaded",
  });
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const quoteList = document.querySelectorAll(".res-1v262t5").innerText;

    return { quoteList };
  });

  // Display the quotes
  console.log(quotes);
  // Close the browser
  await browser.close();
};

// Start the scraping
getQuotes();