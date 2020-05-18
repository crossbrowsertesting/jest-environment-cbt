const { By } = require('selenium-webdriver');

describe('Todo Example', () => {
    test('Successful Todo', async () => {
        console.log(`In login example`);
        await driver.get('http://crossbrowsertesting.github.io/todo-app.html');
        await driver.findElement(By.name("todo-4")).click();
        await driver.findElement(By.name("todo-5")).click();
        await driver.findElement(By.id("todotext")).sendKeys("Run your first Selenium Test");
        await driver.findElement(By.id("addbutton")).click();
        await driver.findElement(By.linkText("archive")).click();
        const activeElements = await driver.findElements(By.className('done-false'));
        const activeLength = activeElements.length;
        expect(activeLength).toEqual(4);
    }, 15000);
});
