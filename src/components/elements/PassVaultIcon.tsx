import * as React from "react";
import { Logger } from "../../utils/logger";
import Vault, { Password } from "../../vault";

declare var document: any;
declare var window: any;

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
        return this.copyStringToClipboard(result.password);
      case "user":
        return this.copyStringToClipboard(result.username);
      case "edit":
        let folder = this.props.folder;
        if (/\/$/.test(folder)) {
          folder = folder.substring(0, folder.length - 1);
        }
        window.location = `#/saveSecret?&folder=${folder}&secret=${this.props.secret}`;
        break;
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

  // Stolen from :
  // https://stackoverflow.com/questions/127040/copy-put-text-on-the-clipboard-with-firefox-safari-and-chrome
  private copyStringToClipboard(str: string): void {
    const handler = (event: any) => {
        event.clipboardData.setData("text/plain", str);
        event.preventDefault();
        document.removeEventListener("copy", handler, true);
    };

    document.addEventListener("copy", handler, true);
    document.execCommand("copy");
    return;
  }

}
