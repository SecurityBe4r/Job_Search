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
  var lang = "Python";
  var position = "Engineer";
  await page.goto(`https://www.ziprecruiter.de/jobs/search?q=${lang}+${position}&l=&lat=49.8&long=11.02&d=`, {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const quoteList = document.querySelectorAll(".jobList-intro");

    return Array.from(quoteList).map((quote) => {

      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText`)
      const job = quote.querySelector(".jobList-title").innerText;
      const description = quote.querySelector(".jobList-description").innerText;
    
      return { job, description };
    });
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
  await browser.close();
};

// Start the scraping
getQuotes();