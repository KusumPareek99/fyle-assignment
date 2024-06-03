const puppeteer = require("puppeteer");

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("file://" + __dirname + "/index.html");
});

afterAll(async () => {
  await browser.close();
});

describe("Home Page Functionalities", () => {
  test("Contact Us button opens a pop-up form", async () => {
    await page.click(".hero_btn");
    await page.waitForSelector("#contactUs.modal.show");
    const isVisible = await page.$eval("#contactUs", (el) =>
      el.classList.contains("show")
    );
    expect(isVisible).toBe(true);
  });

  test("Form submission sends data to getform.io", async () => {
    jest.setTimeout(10000);
    await page.type("#email", "test@example.com");
    await page.type("#firstName", "Test");
    await page.type("#lastName", "User");
    await page.click("#terms");
    await page.click("button.contact_btn");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Form submitted successfully");
      await dialog.dismiss();
    });
  });

  test("What We Do section slider works and dots change accordingly", async () => {
    await page.waitForSelector(".dot");
    await page.click(".dot:nth-child(2)");
    await page.waitFor(1000);

    const totalItems = await page.$$eval(
      ".slider-item",
      (items) => items.length
    );
    for (let i = 0; i < totalItems; i++) {
      await page.click(`.dot:nth-child(${i + 1})`);
      await page.waitFor(1000);
      const activeIndex = await page.$eval(".dot.active", (el) =>
        [...el.parentNode.children].indexOf(el)
      );
      expect(activeIndex).toBe(i);
    }
  });

  test("Read More button in the slider opens fylehq.com in a new tab", async () => {
    await page.waitForSelector(".read_more_btn");
    const [newPage] = await Promise.all([
      new Promise((resolve) => page.once("popup", resolve)),
      page.click(".read_more_btn"),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    expect(newPage.url()).toBe("https://www.fylehq.com/");
  });

  test("OUR PROJECT section image changes on clicking the content on the right", async () => {
    await page.click("#project_1");
    let imgSrc = await page.$eval("#project_image", (img) => img.src);
    imgSrc = imgSrc.replace(/^.*[\\/]/, ""); // Normalize URL to relative path
    expect(imgSrc).toContain("assets/1-2.png");

    await page.click("#project_2");
    imgSrc = await page.$eval("#project_image", (img) => img.src);
    imgSrc = imgSrc.replace(/^.*[\\/]/, "");
    expect(imgSrc).toContain("assets/image.png");

    await page.click("#project_3");
    imgSrc = await page.$eval("#project_image", (img) => img.src);
    imgSrc = imgSrc.replace(/^.*[\\/]/, "");
    expect(imgSrc).toContain("assets/2-2.png");
  });

  test("Experts Growth section highlights on hover", async () => {
    await page.hover(".expert_box");
    const bgColor = await page.$eval(
      ".expert_box",
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe("rgba(0, 0, 0, 0.1)");
  });
});
