(async () => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://lobby.ogame.gameforge.com/es_ES/");

  await page.waitForSelector(".cookiebanner5:nth-child(2)");
  await page.click(".cookiebanner5:nth-child(2)");

  await page.waitForSelector(
    ".loginRegister > #loginRegisterTabs > .tabsList > li:nth-child(1) > span"
  );
  await page.click(
    ".loginRegister > #loginRegisterTabs > .tabsList > li:nth-child(1) > span"
  );

  await page.waitForSelector("#loginTab");
  await page.click("#loginTab");

  await page.waitForSelector('input[type="email"]');
  await page.click('input[type="email"]');
  await page.type('input[type="email"]', "viktor.developer96@gmail.com", {
    delay: 10,
  });

  await page.waitForSelector('input[type="password"]');
  await page.click('input[type="password"]');
  await page.type('input[type="password"]', "sed4cfv52309$", { delay: 10 });

  await page.waitForSelector(
    "#loginForm > p > button.button.button-primary.button-lg"
  );
  await page.click("#loginForm > p > button.button.button-primary.button-lg");
  await page.waitForSelector("div > #joinGame > a > .button > span", {
    timeout: 25000,
  });
  console.log("hecho!!");
  //   await browser.close();
  await page.screenshot({
    path: "./screens/screen.png",
  });
})();
