(async () => {
  const puppeteer = require("puppeteer");
  var userAgent = require("user-agents");
  const browser = await puppeteer.launch({
    dumpio: true,
    headless: true,
    args: ["--start-fullscreen", "--no-sandbox", "--disable-setuid-sandbox"],
    devtools: false,
  });
  console.log("empezando...");
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.toString()); // added this
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
  await page.type('input[type="email"]', "rodrigo.diazranilla@gmail.com", {
    delay: 10,
  });

  await page.waitForSelector('input[type="password"]');
  await page.click('input[type="password"]');
  await page.type('input[type="password"]', "phoneypeople", { delay: 10 });
  // await page.click("input[type='checkbox']");

  // await page.waitForSelector(
  //   "#loginForm > p > button.button.button-primary.button-lg"
  // );
  console.log("antes de click");
  // await click(page, ".button-facebook");
  await click(page, "#loginForm > p > button.button.button-primary.button-lg");
  await page.evaluate(() => {
    console.log(
      "el elemento: ",
      document.querySelector("button[type='submit']")
    );
    return document.querySelector("button[type='submit']").click();
  });
  // await page.goto(
  //   "https://s208-es.ogame.gameforge.com/game/index.php?page=ingame&component=overview&relogin=1"
  // );
  console.log("despues de click");
  await page.screenshot({
    path: "screen9.png",
  });
  await page.waitForSelector("div > #joinGame > a > .button > span", {
    timeout: 10000,
  });
  console.log("hecho!!");
  //   await browser.close();
  //   await page.screenshot({
  //     path: __dirname + "/screens/screen8.png",
  //   });
})();

async function click(page, selector) {
  //selector must to exists
  await page.waitForSelector(selector, { visible: true, timeout: 30000 });
  //give time to extra rendering time
  await page.waitFor(500);
  try {
    await page.click(selector);
  } catch (error) {
    console.log("error clicking " + selector + " : " + error);
  }
}
