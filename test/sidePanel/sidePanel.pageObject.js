/* eslint-env protractor */

const helpers = require("../helpers");

const timeout = 1500;
class SidePanel {
  load() {
    helpers.load("03 | Overlays/Side Panel/Tests", "Automated Test");
  }

  reset() {
    return browser.execute("window.SidePanel.reset()");
  }

  get base() {
    return $(".acl-panel");
  }

  get overlay() {
    return $(".acl-panel-overlay");
  }

  set hasOverlay(hasOverlay) {
    return browser.execute(`window.SidePanel.hasOverlay = ${hasOverlay}`);
  }

  set clickableOverlay(clickable) {
    return browser.execute(`window.SidePanel.clickableOverlay = ${clickable}`);
  }

  clickOverlay() {
    this.overlay.leftClick(0, 0);
    browser.pause(timeout);
  }

  open() {
    browser.execute("window.SidePanel.open()");
    browser.pause(timeout);
  }

  close() {
    browser.execute("window.SidePanel.close()");
    browser.pause(timeout);
  }

  get getBodyOverflow() {
    return $("body").getCssProperty("overflow").value;
  }

  get wasOpened() {
    return browser.execute("return window.SidePanel.onOpen.called").value;
  }

  get closeButton() {
    return $(".acl-panel button.panel__close");
  }

  clickClose() {
    this.closeButton.click();
    browser.pause(timeout);
  }

  get wasClosed() {
    return browser.execute("return window.SidePanel.onClose.called").value;
  }

  set closeOnEscKeyDown(closeOnEscKeyDown) {
    return browser.execute(`window.SidePanel.closeOnEscKeyDown = ${closeOnEscKeyDown}`);
  }

  escape() {
    this.base.click();
    browser.keys("Escape");
    return browser.pause(timeout);
  }

  get title() {
    return $(".acl-panel .panel__title").getText();
  }

  set title(title) {
    return browser.execute(`window.SidePanel.title = '${title}'`);
  }

  set hasCloseButton(hasCloseButton) {
    return browser.execute(`window.SidePanel.hasCloseButton = ${hasCloseButton}`);
  }

  set scrollableBackground(isScrollable) {
    return browser.execute(`window.SidePanel.scrollableBackground = ${isScrollable}`);
  }

  get content() {
    return $(".acl-panel .panel__content");
  }
}

module.exports = new SidePanel();
