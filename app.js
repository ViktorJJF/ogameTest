(async () => {
  try {
    const axios = require("axios");
    const puppeteer = require("puppeteer-core");
    var userAgent = require("user-agents");
    const browserFetcher = puppeteer.createBrowserFetcher();
    let revisionInfo = await browserFetcher.download("884014");

    browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      headless: true,
      devtools: true,
      executablePath: revisionInfo.executablePath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    browser = await browser.createIncognitoBrowserContext();
    console.log("empezando...");
    let page = await browser.newPage();

    page.on("error", (err) => {
      logger.error("Puppeteer error.", err);
    });

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
    // page = clickAndWaitForTarget(
    //   "#loginForm > p > button.button.button-primary.button-lg",
    //   page,
    //   browser
    // );
    var data = JSON.stringify({
      identity: "viktor.developer96@gmail.com",
      password: "sed4cfv52309$",
      locale: "en_GB",
      gfLang: "en",
      platformGameId: "1dfd8e7e-6e1a-4eb1-8c64-03c3b62efd2f",
      gameEnvironmentId: "0a31d605-ffaf-43e7-aa02-d06df7116fc8",
      autoGameAccountCreation: false,
    });

    var config = {
      method: "post",
      url: "https://gameforge.com/api/v1/auth/thin/sessions",
      headers: {
        authority: "gameforge.com",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        "content-type": "application/json",
        "tnt-installation-id": "",
        "sec-ch-ua-mobile": "?0",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "sec-ch-ua-platform": '"Windows"',
        accept: "*/*",
        origin: "https://lobby.ogame.gameforge.com",
        "sec-fetch-site": "same-site",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        referer: "https://lobby.ogame.gameforge.com/",
        "accept-language": "en",
      },
      data: data,
    };

    const response = await axios(config);
    const token = response.data.token;
    console.log("🚀 Aqui *** -> token", token);
    await page.evaluate((token) => {
      console.log("el token: ", token);
      function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }
      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
      function eraseCookie(name) {
        document.cookie =
          name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
      setCookie("gf-token-production", token, 7);
      console.log("COOKIE AGREGADO!");
      return true;
    }, token);
    await page.goto(
      "https://s208-es.ogame.gameforge.com/game/index.php?page=ingame&component=overview&relogin=1"
    );
    await page.goto(
      "https://s208-es.ogame.gameforge.com/game/index.php?page=ingame&component=overview&relogin=1"
    );
    await page.waitForSelector("div > #joinGame > a > .button > span", {
      timeout: 10000,
    });
    await page.click("div > #joinGame > a > .button > span", {
      timeout: 10000,
    });
    console.log("despues de click");
    await page.screenshot({
      path: "screen9.png",
    });
    console.log("hecho!!");
    //   await browser.close();
    //   await page.screenshot({
    //     path: __dirname + "/screens/screen8.png",
    //   });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data);
    }
  }
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

async function clickAndWaitForTarget(clickSelector, page, browser) {
  const pageTarget = page.target(); //save this to know that this was the opener
  await page.click(clickSelector); //click on a link
  const newTarget = await browser.waitForTarget(
    (target) => target.opener() === pageTarget
  ); //check that you opened this page, rather than just checking the url
  const newPage = await newTarget.page(); //get the page object
  // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
  await newPage.waitForSelector("body"); //wait for page to be loaded
  // newPage.on("console", consoleObj => console.log(consoleObj.text()));
  return newPage;
}
