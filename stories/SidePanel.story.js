import React from "react";
import { storiesOf } from "@storybook/react";
import { windowHandles, Input, Action, Callback } from "../.storybook/windowhooks";
import SidePanel from "../components/SidePanel/SidePanel";
import sinon from 'sinon';

storiesOf('Side Panel', module).add('Open', () => (
  <SidePanel
    isOpen={true}
    onClose={() => { window.onCloseCalled = true; }}
  />
));

storiesOf("Side Panel", module)
  .addDecorator(
    windowHandles({
      title: new Input("ACL Side Panel"),
      hasOverlay: new Input(),
      clickableOverlay: new Input(),
      closeOnEscKeyDown: new Input(),
      scrollableBackground: new Input(),
      hasCloseButton: new Input(),
      onOpen: new Callback(),
      onClose: new Callback(),
      open: new Action(),
      close: new Action(),
    })
  )
  .add("Automated Test", () => (
    <SidePanel id="test-side-panel">
      <h1>Side Panel Content</h1>
    </SidePanel>
  ));
