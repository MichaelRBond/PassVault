import * as React from "react";
import {PassVaultModel} from "../../models/passvault";
import { buildUrlFromStr, getPrettyUrl } from "../../utils/helpers";
import PassVaultIcon from "../elements/PassVaultIcon";

interface ComponentProps {
  folder: string;
  secret: string;
  passvault: PassVaultModel;
}

export default class PassVaultSecret extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    this.render = this.render.bind(this);
  }

  public render() {
    const prettyUrl = getPrettyUrl(this.props.secret);
    const url = buildUrlFromStr(this.props.secret);
    return (
      <div className="row">
        <div className="col s1 left-align">
          <a href="test.com" className="grey-text">
        <i className="material-icons prefix">personal_video</i>
        </a>
        </div>
        <div className="col s6 offset-s1 left-align">
          <a href={url}>{prettyUrl}</a>
        </div>
        <PassVaultIcon
          type="user"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
        />
        <PassVaultIcon
          type="password"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
        />
        <PassVaultIcon
          type="edit"
          folder={this.props.folder}
          secret={this.props.secret}
          passvault={this.props.passvault}
        />
      </div>
    );
  }
}
