import * as React from "react";

import ConfirmButton from "../elements/ConfirmButton";
import RoundButton from "../elements/RoundButton";

const logo = require("./passvaultlogo.png");

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
}

interface ComponentState {
  url: string;
}

export default class WelcomeScreen extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      url: "",
    };

    this.updateUrl = this.updateUrl.bind(this);
  }

  public updateUrl(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      url: (e.currentTarget as any).value,
    });
  }

  public render() {
    return (
       <main>
        <div className="page-content">
          <div>
            <div className="center-text">
              <img src={logo} />
            </div>
            <div className="row">
              <p className="center-text">
                Welcome to PassVault
              </p>
              <p className="center-text">
                Please configure the Vault server to connect to for password storage.
                You can return to change these settings at any point by clicking the
                options button in the top right corner
              </p>
            </div>
            <div className="center-text col s12">
              <form>
                <div className="input-field">
                  <input type="text" id="vault_url" onChange={this.updateUrl} placeholder="https://myvault.com:8200" />
                  <label htmlFor="vault_url" className="active">Vault URL</label>
                </div>
              </form>
            </div>
            <div className="row center-text">
              <RoundButton text={"Test Connection"} onclickHandler={(e: Event) => { this.handleTestConnection(e); }}/>
            </div>
            <div className="row center-text">
              <ConfirmButton text={"Save"} onclickHandler={(e: Event) => { this.handleConfirm(e); }}/>
            </div>
          </div>
        </div>
      </main>
    );
  }

  private handleTestConnection(e: Event) {
    if (this.props.handleTestConnection) {
      this.props.handleTestConnection(e);
    }
  }

  private handleConfirm(e: Event) {
    if (this.props.handleConfirm) {
      this.props.handleConfirm(this.state.url);
    }
  }
}
