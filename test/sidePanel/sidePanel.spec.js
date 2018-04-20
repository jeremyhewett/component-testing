/* eslint-env protractor */

const sidePanel = require("./sidePanel.pageObject");

describe("Side Panel", () => {
  beforeAll(() => {
    sidePanel.load();
  });

  beforeEach(() => {
    sidePanel.reset();
  });

  it('should be visible when isVisible prop is true', () => {
    loadStory('SidePanel', 'Open');
    expect($('.acl-panel').isVisible()).toEqual(true);
  });

  function loadStory(group, name) {
    browser.url(`/?selectedKind=${group}&selectedStory=${name}`);
    browser.frame('storybook-preview-iframe');
  }

  it("should not be visible initially", () => {
    expect(sidePanel.base.isVisible()).toEqual(false);
  });

  it("should become visible and call onOpen when opened", () => {
    sidePanel.open();
    expect(sidePanel.base.isVisible()).toEqual(true);
    expect(sidePanel.wasOpened).toEqual(true);
  });

  it('should call onClose when closed', () => {
    loadStory('SidePanel', 'Open');
    $('.sidepanel .close-button').click();
    expect(browser.execute('return window.onCloseCalled').value)
      .toEqual(true);
  });

  it("should display overlay when hasOverlay is true", () => {
    sidePanel.hasOverlay = true;
    sidePanel.open();
    expect(sidePanel.overlay.isVisible()).toEqual(true);
  });

  it("shouldn't display overlay when hasOverlay is false", () => {
    sidePanel.hasOverlay = false;
    sidePanel.open();
    expect(sidePanel.overlay.isExisting()).toEqual(false);
  });

  describe("when open", () => {
    beforeEach(() => {
      sidePanel.open();
    });

    it("should display given title", () => {
      sidePanel.title = "Given Title";
      expect(sidePanel.title).toEqual("Given Title");
    });

    it("should display transcluded content", () => {
      expect(sidePanel.content.getText()).toEqual("Side Panel Content");
    });

    it("should display close button by default", () => {
      expect(sidePanel.closeButton.isVisible()).toEqual(true);
    });

    it("should display close button when hasCloseButton is true", () => {
      sidePanel.hasCloseButton = true;
      expect(sidePanel.closeButton.isVisible()).toEqual(true);
    });

    it("shouldn't display close button when hasCloseButton is false", () => {
      sidePanel.hasCloseButton = false;
      expect(sidePanel.closeButton.isExisting()).toEqual(false);
    });

    it("should close when overlay is clicked", () => {
      sidePanel.clickOverlay();
      expect(sidePanel.base.isVisible()).toEqual(false);
    });

    it("shouldn't close when overlay is clicked and clickableOverlay is false", () => {
      sidePanel.clickableOverlay = false;
      sidePanel.clickOverlay();
      expect(sidePanel.base.isVisible()).toEqual(true);
    });

    it("should close when escape is pressed", () => {
      sidePanel.escape();
      expect(sidePanel.base.isVisible()).toEqual(false);
      expect(sidePanel.wasClosed).toEqual(true);
    });

    it("shouldn't close when escape is pressed and closeOnEscKeyDown is false", () => {
      sidePanel.closeOnEscKeyDown = false;
      sidePanel.escape();
      expect(sidePanel.base.isVisible()).toEqual(true);
      expect(sidePanel.wasClosed).toBeFalsy();
    });

    it("should become invisible and call onClose when closed", () => {
      sidePanel.clickClose();
      expect(sidePanel.base.isVisible()).toEqual(false);
      expect(sidePanel.wasClosed).toEqual(true);
    });

    it("should't scroll the background by default", () => {
      expect(sidePanel.getBodyOverflow).toEqual("hidden");
      sidePanel.close();
      expect(sidePanel.getBodyOverflow).toEqual("visible");
    });

    it("should scroll the background when scrollableBackground is true", () => {
      sidePanel.close();
      sidePanel.scrollableBackground = true;
      sidePanel.open();
      expect(sidePanel.getBodyOverflow).toEqual("visible");
    });
  });
});
