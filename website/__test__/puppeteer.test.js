const puppeteer = require('puppeteer');
const APP = `http://localhost:${process.env.PORT || 8080}/`;
jest.setTimeout(100000);

describe('Nav bar clicks', () => {
  let browser;
  let page;

  const avroSchema = `{
    "type": "record",
    "name": "Trip",
    "fields": [
      {
        "name": "id",
        "type": "string"
      },
      {
        "name": "vehicleId",
        "type": "string"
      }
    ]
  }`;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 30,
        defaultViewport: {
          width: 1280,
          height: 720,
        },
      });
      page = await browser.newPage();
      await page.goto(APP);
      await page.screenshot({
        path: '/Users/yingliu/KafQL/website/__test__/screenshot/puppeteerScreenShot.jpg',
      });
    } catch (err) {
      console.log(err);
    }
  });

  test('click on nav bar', async () => {
    try {
      await page.waitForTimeout(500);
      await page.waitForSelector('#documentation');
      await page.focus('#documentation');
      await page.click('#documentation');
      await page.waitForTimeout(500);

      await page.waitForSelector('#meettheteam');
      await page.focus('#meettheteam');
      await page.click('#meettheteam');
      await page.waitForTimeout(800);
    } catch (error) {
      console.error(error.message);
    }
  });

  test('convertor functionality', async () => {
    try {
      await page.waitForSelector('#useonline');
      await page.focus('#useonline');
      await page.click('#useonline');
      await page.waitForTimeout(1000);

      await page.waitForSelector('#avroInput');
      await page.focus('#avroInput');
      await page.evaluate(
        () => (document.getElementById('avroInput').value = '')
      );
      await page.keyboard.type(avroSchema);
      await page.waitForTimeout(1000);
      await page.waitForSelector('#generate');
      await page.focus('#generate');
      await page.click('#generate');
      await page.waitForTimeout(1500);

      await page.waitForSelector('#clear');
      await page.focus('#clear');
      await page.click('#clear');
      await page.waitForTimeout(1000);

      await page.waitForTimeout(500);
      await page.waitForSelector('#home');
      await page.focus('#home');
      await page.click('#home');
      await page.waitForTimeout(500);
    } catch (error) {
      console.error(error.message);
    }
  });

  afterAll(async () => {
    try {
      await browser.close();
    } catch (err) {
      console.log(err);
    }
  });
});
