<h2><strong>Getting Started with Jest and CrossBrowserTesting</strong></h2>
Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
It works with projects using: <a href="https://babeljs.io/">Babel</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://nodejs.org/en/">Node</a>, <a href="https://reactjs.org/">React</a>, <a href="https://angular.io/">Angular</a>, <a href="https://vuejs.org/">Vue</a> and more!
<h3>Setting up Jest</h3>
1.  Install yarn
<pre><code>npm install yarn</code></pre>
2. Install jest
<pre><code>yarn add --dev jest</code></pre>
3. Edit the file package.json to include the following
<pre><code>"scripts": {
   "test": "jest"
}
</code></pre>
<h3>Create your first test</h3>
1. Create file cbt.test.js

Now, just copy the following script into a text editor of your choice, and be sure to add your CBT username and authkey to the script. To get yours, sign up for a <a href="https://crossbrowsertesting.com/freetrial" rel="nofollow"><b>free trial</b></a> or purchase a <a href="https://crossbrowsertesting.com/pricing" rel="nofollow"><b>plan</b></a>.
<pre><code>
var webdriver = require("selenium-webdriver");
var cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";

var username ='YOUR_USERNAME'; //replace with your email address
var authkey = 'YOUR_AUTHKEY'; //replace with your authkey

//set capabilities
var caps = {
name : 'Login Example',
build : '1.0',
version : '70',
platform : 'Windows 10',
screen_resolution : '1366x768',
record_video : 'true',
record_network : 'false',
browserName : 'Chrome',
username : username,
password : authkey
};

const { By, until } = webdriver

describe('webdriver', () =&gt; {
let driver;

beforeAll(async () =&gt; {
driver = new webdriver.Builder()
.usingServer(cbtHub)
.withCapabilities(caps)
.build();

await driver.get('http://crossbrowsertesting.github.io/login-form.html');
},10000);

afterAll(async () =&gt; {
await driver.quit();
}, 10000);

// test case
test('Successful Login', async () =&gt; {
await driver.findElement(webdriver.By.id("username")).sendKeys("tester@crossbrowsertesting.com");
await driver.findElement(webdriver.By.xpath("//*[@type=\"password\"]")).sendKeys("test123");

await driver.findElement(webdriver.By.css("button[type=submit]")).click();
output = await driver.wait(webdriver.until.elementLocated(webdriver.By.id("logged-in")), 10000);
outputVal = await output.getAttribute('innerHTML');

expect(outputVal).toEqual('You are now logged in!');
});
});
</code></pre>
<h3>Running your test</h3>
<pre><code>yarn test</code></pre>
As you can probably make out from our example test, we check if a successful login was achieved.

If you have any questions or concerns, feel <a href="mailto:support@crossbrowsertesting.com">free to get in touch</a>.
