import * as React from "react";
import { Logger } from "../../utils/logger";
import Vault, { Password } from "../../vault";

declare var document: any;

const logger = new Logger("PassVaultIcon");

interface ComponentProps {
  type: string;
  folder: string;
  secret: string;
  vault: Vault;
}

interface ComponentState {
  icon: string;
}

export default class PassVaultIcon extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      icon: this.determineIcon(),
    };

    this.render = this.render.bind(this);
    this.clickIcon = this.clickIcon.bind(this);
  }

  public render() {
    return (
      <div className="col s1 center-align">
        <i className="material-icons grey-text" onClick={this.clickIcon}>{this.state.icon}</i>
      </div>
    );
  }

  private async clickIcon(): Promise<void> {
    const result = await this.props.vault.getPassword(`${this.props.folder}${this.props.secret}`);
    this.handleClick(result);
    return;
  }

  private handleClick(result: Password): void {
    switch (this.props.type) {
      case "password":
        console.log("PASSWORD: ", result.password);
        return this.copyTextToClipboard(result.password);
      case "user":
        console.log("USER: ", result.username);
        return this.copyTextToClipboard(result.username);
      default:
        logger.error("Invalid event type");
        return;
    }
  }

  private determineIcon(): string {
    switch (this.props.type) {
      case "user":
        return "person";
      case "password":
        return "lock";
      case "edit":
        return "mode_edit";
      default:
        return "broken_image";
    }
  }

  // STOLEN From: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#30810322
  private copyTextToClipboard(text: string): void {
    const textArea = document.createElement("textarea");
    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won"t even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn"t work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don"t need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      logger.error("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
  }
}
