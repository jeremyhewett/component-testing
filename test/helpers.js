const helpers = {
  load: (kind, story) => {
    browser.url(`/?selectedKind=${kind}&selectedStory=${story}`);
    browser.frame("storybook-preview-iframe");
  }
};

module.exports = helpers;
