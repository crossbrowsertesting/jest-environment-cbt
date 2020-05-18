const NodeEnvironment = require('jest-environment-node');
const cbtTunnels = require('cbt_tunnels');
const path = require('path');
const webdriver = require('selenium-webdriver');
const _ = require('lodash');
const cbtHub = "http://hub.crossbrowsertesting.com:80/wd/hub";

class CbtEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        this.username = process.env['USERNAME'];
        this.authkey = process.env['AUTHKEY'];
        if (config.testEnvironmentOptions && config.testEnvironmentOptions.username &&
            config.testEnvironmentOptions.authkey) {
            this.username = config.testEnvironmentOptions.username;
            this.authkey = config.testEnvironmentOptions.authkey;
        }

        if (!(this.username && this.authkey)) {
            let errorMessage = `
                Can't start test on CBT without username/authkey!
                You can find them at https://app.crossbrowsertesting.com/selenium/run.
                Provide them in your Jest config, or as environment variables USERNAME/AUTHKEY.
            `;
            throw new Error(errorMessage);
        }

        this.testName = path.basename(context.testPath).replace(/\./g, '_');
        this.config = config;
        this.tunnelStarted = false;
   }

    async setup() {
        await super.setup();
        await this.startTunnel(this.config);
        await this.startWebdriver(this.config);
    }

    runScript(script) {
        return super.runScript(script);
    }

    async teardown() {
        await super.teardown();
        await this.shutdownDriver();
        if (this.tunnelStarted) {
            cbtTunnels.stop();
        }
    }

    async startTunnel(config) {
        if (config.testEnvironmentOptions && config.testEnvironmentOptions.startLocalConnection) {
            return new Promise((resolve, reject) => {
                let tunnelOptions = {
                    username: this.username,
                    authkey: this.authkey,
                    tunnelname: this.testName,
                    quiet: true,
                };

                cbtTunnels.start(tunnelOptions, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.tunnelStarted = true;
                        resolve();
                    }
                });
            });
        }
    }

    async startWebdriver (config) {
        let caps = {
            name: this.testName,
            browserName: 'chrome',
            recordVideo: 'true',
            username: this.username,
            password: this.authkey,
        };

        if (config.testEnvironmentOptions && config.testEnvironmentOptions.capabilities) {
            caps = _.merge(caps, config.testEnvironmentOptions.capabilities);
        }

        if (this.tunnelStarted) {
            caps.tunnelname = this.testName;
        }

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

    async shutdownDriver() {
        if (this.global.driver) {
            await this.global.driver.quit();
        }
    }
}

module.exports = CbtEnvironment;
