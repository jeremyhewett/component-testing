exports.config = {
  specs: ["./test/**/*.spec.js"],
  exclude: [],
  services: ["selenium-standalone"],
  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      chromeOptions: {
        args: ["headless", "disable-gpu"],
      },
    },
  ],
  reporters: ["spec"],
  maxInstances: 1,
  sync: true,
  logLevel: "error",
  coloredLogs: true,
  bail: 0,
  baseUrl: "http://localhost:9001/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "jasmine",
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
  },
  screenshotPath: "./test/errorScreen",
  deprecationWarnings: false,
  before: function(config, capabilities) {
    browser.timeouts("implicit", 5000);
    browser.setViewportSize({ width: 1700, height: 1100 }, false);
  },
};
