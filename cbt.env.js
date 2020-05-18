const NodeEnvironment = require('jest-environment-node');
const util = require('util');
const path = require('path');
const webdriver = require('selenium-webdriver');
const username = process.env['USERNAME'];
const authkey = process.env['AUTHKEY'];
const processTestResults = require('./cbt-reporter').default;

class CbtEnvironment extends NodeEnvironment {
    constructor(config, context) {
        console.log(`Running with config: ${util.inspect(config)}, ${util.inspect(context)}`);
        config.testResultsProcessor = processTestResults;
        super(config, context);
        this.testName = path.basename(context.testPath);
    }

    async setup() {
        await super.setup();
        const cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";
        const caps = {
            name: this.testName,
            browserName: 'chrome',
            platform: 'Windows 10',
            recordVideo: 'true',
            username: username,
            password: authkey,
        };

        try {
            this.global.driver = await new webdriver.Builder()
                .usingServer(cbtHub)
                .withCapabilities(caps)
                .build();
        } catch (cbtException) {
            console.error(`Error starting test on CBT!`, cbtException.message);
            throw cbtException;
        }
    }

    runScript(script) {
        console.log(`Script: ${util.inspect(script)}`);
        return super.runScript(script);
    }

    async teardown() {
        console.log(`Global on tearDown: ${util.inspect(this.global)}`);
        await super.teardown();
        await this.shutdownDriver();
    }

    async shutdownDriver() {
        if (this.global.driver) {
            await this.global.driver.quit();
        }
    }

    async processTestResults(results) {
        console.log(`Test results: ${util.inspect(results)}`);
    }
}

module.exports = CbtEnvironment;
