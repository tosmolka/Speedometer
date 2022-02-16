const webdriver = require('selenium-webdriver');
require('chromedriver');
require('edgedriver');

const rootUrl = `${process.env.BLOB_STORAGE_URL || "http://localhost:8088"}/Speedometer`;

/**
 * 
 * @param {webdriver.Capabilities} capabilities
 * @param {boolean} withTrustedtypes
 */
async function runSpeedometer(capabilities, withTrustedtypes = false) {
  let builder = new webdriver.Builder().withCapabilities(capabilities);
  
  if (process.env.BROWSERSTACK_USERNAME && process.env.BROWSERSTACK_ACCESS_KEY) {
    builder = builder.usingServer(`https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`);
  }

  let driver = builder.build();

  const getElementText = async (elementId) => {
    let element = await driver.wait(webdriver.until.elementLocated(webdriver.By.id(elementId)));
    return await element.getText();
  };

  try {
    let indexFile = `${withTrustedtypes ? "index-tt" : "index"}.html`;
    await driver.navigate().to(`${rootUrl}/${indexFile}?startAutomatically=1`);

    let showDetailsButton = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(webdriver.By.css("button.show-details"))));
    await showDetailsButton.click();

    let score = await getElementText('results-with-statistics');
    let heapStats = await getElementText('results-heap-stats');
    
    console.log(`Browser: ${capabilities.getBrowserName()}, Trusted Types: ${withTrustedtypes}, Score: ${score}, Heap: ${heapStats}`);
  } finally {
    await driver.quit();
  }
}

async function runTestWithCaps(capabilities) {
  await runSpeedometer(capabilities, false);
  await runSpeedometer(capabilities, true);
}

runTestWithCaps(webdriver.Capabilities.chrome());
//runTestWithCaps(webdriver.Capabilities.edge());