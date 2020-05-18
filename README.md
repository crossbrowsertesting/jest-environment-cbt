### Getting Started with Jest and CrossBrowserTesting
Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
It works with projects using: <a href="https://babeljs.io/">Babel</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://nodejs.org/en/">Node</a>, <a href="https://reactjs.org/">React</a>, <a href="https://angular.io/">Angular</a>, <a href="https://vuejs.org/">Vue</a> and more!
#### Setting up the Jest CrossBrowserTesting Environment
Install the environment:

```yarn add --dev jest-environment-cbt```

or 

```npm install --save-dev jest-environment-cbt```

Edit the file package.json or Jest configuration file to start using CBT capabilities
```javascript
    
    "jest": {
      "testEnvironment": "jest-environment-cbt",
      "testEnvironmentOptions": {
        "startLocalConnection": false,
        "capabilities": {
          "platform": "Windows 10",
          "browserName": "Firefox",
          "recordVideo": "true"
        }
      }
    },

```

#### CBT Authorization

You can pass your CBT credentials one of two ways: 

via environment variables:
```shell script
export USERNAME="YOURUSERNAME"
export AUTHKEY="YOURAUTHKEY"
```

or via your Jest Configuration
```angular2
    "testEnvironmentOptions": {
        "username": "YOURUSERNAME",
        "authkey": "YOURAUTHKEY",
        "capabilities": {
        ...
        
```

#### Local Connection

You can use this environment to start a local connection via CrossBrowserTesting so that resources within your network become accessible in our browsers. Just set `startLocalConnection` to `true` in your testEnvironmentOptions, and the this module will take care of the rest.

#### Create your first test

If you're using this environment, the CBT browser will automatically be in scope.

```javascript
const { By } = require('selenium-webdriver');

describe('Todo Example', () => {
    test('Successful Todo', async () => {
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
```

#### Support
If you have any questions or concerns, feel <a href="mailto:support@crossbrowsertesting.com">free to get in touch</a>.
