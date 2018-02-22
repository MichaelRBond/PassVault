import * as React from "react";
import Vault from "../../vault";
import ConfirmButton from "../elements/ConfirmButton";
import RoundButton from "../elements/RoundButton";
import TextInput from "../elements/TextInput";

const logo = require("./passvaultlogo.png");

interface ComponentProps {
  handleConfirm: any;
  vault: Vault;
}

interface ComponentState {
  url: string;
}

declare var window: any;

export default class WelcomeScreen extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      url: "",
    };
  }

  public updateUrl(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      url: (e.currentTarget as any).value,
    });
  }

  public async handleTestConnection(): Promise<boolean> {
    return this.props.vault.testConnection(this.state.url);
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
                <TextInput
                    id="vault_url"
                    label="Vault URL"
                    validate={true}
                    colSize={12}
                    onChangeHandler={this.updateUrl.bind(this)}
                    placeholder="https://myvault.com:8200"
                  />
              </form>
            </div>
            <div className="row center-text">
              <RoundButton
                text={"Test Connection"}
                onclickHandler={async (e: Event) => { await this.handleTestConnection(); }}
              />
            </div>
            <div className="row center-text">
              <ConfirmButton text={"Save"} onclickHandler={async (e: Event) => { await this.handleConfirm(e); }}/>
            </div>
          </div>
        </div>
      </main>
    );
  }

  private async handleConfirm(e: Event) {
    const success = await this.handleTestConnection();
    if (success) {
      window.localStorage.setItem("__passvault_vault_url", this.state.url);
      await this.props.handleConfirm(this.state.url);
    }
    return;
  }
}
