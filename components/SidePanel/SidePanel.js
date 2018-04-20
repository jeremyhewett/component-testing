import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SidePanel.scss";

const className = "acl-panel";

export default class SidePanel extends Component {
  static propTypes = {
    /**
     * The content for the Side Panel
     */
    children: PropTypes.node,
    /**
     * Text displaying as title at the top of the controller
     */
    title: PropTypes.string,
    /**
     * Disable the click event for the overlay, default is click event enable
     * @string true or false, this is a string format not a boolean
     */
    clickableOverlay: PropTypes.bool,
    /**
     * Disable the scrol of the overlay when sidepanel is open,
     */
    scrollableBackground: PropTypes.bool,
    /**
     * Disable the displaying of the overlay, default is enable
     * @string true or false, this is a string format not a boolean
     */
    hasOverlay: PropTypes.bool,
    /**
     * Hide the close button of the top right corner,
     * default is showing the button hasCloseButton="false"
     */
    hasCloseButton: PropTypes.bool,
    /**
     * Disable the event of key up "esc" default is enable
     */
    closeOnEscKeyDown: PropTypes.bool,
    /**
     * Callback for onOpen event
     */
    onOpen: PropTypes.func,
    /**
     * Callback for onClose event
     */
    onClose: PropTypes.func,
    /**
     * Control the visibility of the side panel. This prop makes the side panel
     * semi controlled
     */
    isOpen: PropTypes.bool,
    /**
     * The header can cause problems with z-index with overlapping elements
     * ex. GuidedTour step on scrolling.
     * This property give the option to override the z-index for this element
     */
    zIndexHeader: PropTypes.number,
  };

  static defaultProps = {
    clickableOverlay: true,
    scrollableBackground: false,
    hasOverlay: true,
    hasCloseButton: true,
    closeOnEscKeyDown: true,
    zIndexHeader: 7,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen === true,
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.onEscapeKey, false);
    if (this.state.isOpen) {
      this.showA11yDialog();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled()) {
      const oldProps = this.props;
      this.setState({ isOpen: nextProps.isOpen }, () => {
        if (oldProps.open && !this.props.open) {
          this.hideA11yDialog();
        } else if (!oldProps.open && this.props.open) {
          this.showA11yDialog();
        }
      });
    }
  }

  componentDidUpdate() {
    document.body.style.overflow = this.state.isOpen && !this.props.scrollableBackground ? "hidden" : "visible";
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onEscapeKey, false);
    this.hideA11yDialog();
  }

  onOpen() {
    this.showA11yDialog();
    if (this.props.onOpen) {
      this.props.onOpen({ instance: this });
    }
  }

  onClose() {
    this.hideA11yDialog();
    if (this.props.onClose) {
      this.props.onClose({ instance: this });
    }
  }

  onEscapeKey = e => {
    if (this.props.closeOnEscKeyDown && e.keyCode === 27) {
      this.close();
    }
  };

  onCloseButtonClick = () => {
    this.close();
  };

  onOverlayClick = () => {
    if (!this.props.clickableOverlay) return;
    this.close();
  };

  getPanelClassName() {
    const classes = [className];
    classes.push(`${className}--slide-right`);
    classes.push(this.state.isOpen ? "is-open" : "");
    return classes.filter(clazz => clazz).join(" ");
  }

  open() {
    if (!this.state.isOpen) {
      if (this.isControlled()) {
        this.onOpen();
      } else {
        this.setState({ isOpen: true }, this.onOpen);
      }
    }
  }

  close() {
    if (this.state.isOpen) {
      if (this.isControlled()) {
        this.onClose();
      } else {
        this.setState({ isOpen: false }, this.onClose);
      }
    }
  }

  showA11yDialog() {
    const el = document.getElementById(this.dialogId);
    if (el) {
      this.a11yDialog = new Dialog(el);
      this.a11yDialog.show();
    }
  }

  hideA11yDialog() {
    if (this.a11yDialog) {
      this.a11yDialog.hide();
      this.a11yDialog.destroy();
      this.a11yDialog = null;
    }
  }

  isControlled() {
    return this.props.isOpen !== undefined;
  }

  renderOverlay() {
    if (!this.props.hasOverlay) return null;

    return <div className="acl-panel-overlay" onClick={this.onOverlayClick} onKeyUp={this.onEscapeKey} />;
  }

  renderCloseButton() {
    if (!this.props.hasCloseButton) return null;

    return (
      <button
        type="button"
        className="panel__close"
        style={{ zIndex: this.props.zIndexHeader + 1 }}
        onClick={this.onCloseButtonClick}
        aria-label="Close" // TODO: i18next
      >
        <i className="acl-i-times close__icon" />
      </button>
    );
  }

  renderSidePanelContent() {
    return (
      <div className={this.getPanelClassName()}>
        {this.renderCloseButton()}
        <div className="panel__body">
          <div className="panel__header" style={{ zIndex: this.props.zIndexHeader }}>
            <h2 className="panel__title" id={this.titleId}>
              {this.props.title}
            </h2>
          </div>
          <div className="panel__content">{this.props.children}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="aclui-sidepanel" id={this.dialogId} role="dialog" aria-labelledby={this.titleId}>
        {this.renderSidePanelContent()}
        {this.renderOverlay()}
      </div>
    );
  }
}
