import * as React from "react";
import {PassVaultModel, Secret} from "../../models/passvault";
import { buildUrlFromStr } from "../../utils/helpers";
import PassVaultIcon from "../elements/PassVaultIcon";

interface ComponentProps {
  folder: string;
  secret: Secret;
  passvault: PassVaultModel;
}

export default class PassVaultSecret extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    this.render = this.render.bind(this);
  }

  public render() {
    const url = buildUrlFromStr(this.props.secret.url);
    return (
      <div className="row" key={`${this.props.folder}-row`}>
        <div className="col s1 left-align">
          <a href="test.com" className="grey-text">
        <i className="material-icons prefix">personal_video</i>
        </a>
        </div>
        <div className="col s6 offset-s1 left-align">
          <a href={url}>{this.props.secret.name}</a>
        </div>
        <PassVaultIcon
          type="user"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
          title="Copy Username"
        />
        <PassVaultIcon
          type="password"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
          title="Copy Password"
        />
        <PassVaultIcon
          type="edit"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
          title="Edit Password Entry"
        />
      </div>
    );
  }
}
