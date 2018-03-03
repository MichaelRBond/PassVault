import * as React from "react";
import {Config} from "../../config";
import {PassVaultModel, Secret} from "../../models/passvault";
import {changeWindowLocation, copyStringToClipboard} from "../../utils/browser";
import { Logger } from "../../utils/logger";

const logger = new Logger("PassVaultIcon");

interface ComponentProps {
  type: string;
  folder: string;
  secret: Secret;
  passvault: PassVaultModel;
  title?: string;
}

interface ComponentState {
  icon: string;
}

export default class PassVaultIcon extends React.Component<ComponentProps, ComponentState> {
  public static defaultProps: ComponentProps = {
    type: "",
    folder: "",
    secret: null, // TODO: Convert to optional
    passvault: undefined,
    title: "",
  };
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      icon: this.determineIcon(),
    };

    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <div className="col s1 left-align min-40">
        <a className="btn-floating waves-effect waves-light btn-small">
          <i className="material-icons" title={this.props.title} onClick={this.handleClick}>{this.state.icon}</i>
        </a>
      </div>
    );
  }

  private handleClick(): void {
    switch (this.props.type) {
      case "password":
        return copyStringToClipboard(this.props.secret.password);
      case "user":
        return copyStringToClipboard(this.props.secret.username);
      case "edit":
        let folder = this.props.folder;
        if (/\/$/.test(folder)) {
          folder = folder.substring(0, folder.length - 1);
        }
        changeWindowLocation(`${Config.PAGE_SECRET}?&folder=${folder}&secret=${this.props.secret.name}`);
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

}
