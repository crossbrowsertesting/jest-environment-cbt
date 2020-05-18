const { By, until } = require('selenium-webdriver');

describe('Login Test', () => {
    test('Successful Login', async () => {
        console.log(`In login example`);
        await driver.get('http://crossbrowsertesting.github.io/login-form.html');
        await driver.findElement(By.id("username")).sendKeys("tester@crossbrowsertesting.com");
        await driver.findElement(By.xpath("//*[@type=\"password\"]")).sendKeys("test123");
        await driver.findElement(By.css("button[type=submit]")).click();
    }, 15000);
});
