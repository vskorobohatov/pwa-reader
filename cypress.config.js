const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://scalan.com/apps/reader',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
