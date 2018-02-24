import * as React from "react";
import {PassVaultModel} from "../../models/passvault";
import Checkbox from "../elements/Checkbox";
import ConfirmButton from "../elements/ConfirmButton";
import SelectBox from "../elements/SelectBox";
import TextInput from "../elements/TextInput";

const logo = require("./passvaultlogo.png");

interface ComponentProps {
  passvault: PassVaultModel;
}

interface ComponentState {
  username: string;
  password: string;
  rememberLogin: boolean;
}

declare var window: any;

export default class LoginScreen extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    if (!props.passvault) {
      window.location = "/#/start";
    }

    this.state = {
      username: "",
      password: "",
      rememberLogin: true,
    };
  }

  public updateUsername(username: string) {
    this.setState({
      ...this.state,
      username,
    });
  }

  public updatePassword(password: string) {
    this.setState({
      ...this.state,
      password,
    });
    return;
  }

  public setRememberPassword(remember: boolean) {
    this.setState({
      ...this.state,
      rememberLogin: remember,
    });
    return;
  }

  public async tryLogin(): Promise<void> {
    try {
      await this.props.passvault.login(this.state.username, this.state.password);
      if (this.state.rememberLogin) {
        window.localStorage.setItem("__passvault_vault_token", this.props.passvault.getToken());
        window.localStorage.setItem("__passvault_vault_username", this.state.username);
      }

      window.location = "#/main";
    } catch {
      window.alert("login invalid");
    }
    return;
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
                <div className="col s12">
                    <div className="input-field col s12 center-align">
                        <SelectBox id="auth-select" options={[
                          {
                            label: "Select your auth method",
                            disabled: true,
                            selected: true,
                          },
                          {
                            label: "Github",
                          },
                          {
                            label: "Token",
                          },
                          {
                            label: "Userpass",
                          },
                        ]}/>
                    </div>
                </div>
                <div className="col s12 center-align pad-top-20">
                  <TextInput
                      id="username"
                      label="Username"
                      validate={true}
                      colSize={12}
                      value={this.state.username}
                      onChangeHandler={(e: any) => this.updateUsername(e.currentTarget.value)}
                    />
                </div>
                <div className="col s12 center-align">
                    <TextInput
                      id="password"
                      label="Password"
                      type="password"
                      validate={true}
                      colSize={12}
                      value={this.state.password}
                      onChangeHandler={(e: any) => this.updatePassword(e.currentTarget.value)}
                    />
                    <div className="col s12 center-align">
                        <Checkbox
                          label="Remember Login?"
                          onChangeHandler={(checked: boolean) => this.setRememberPassword(checked)}
                          checked={this.state.rememberLogin}
                        />
                    </div>
                    <div className="col s12 center-align pad-top-50">
                        <ConfirmButton
                          text="Login"
                          onclickHandler={() => this.tryLogin()}
                          type="big-button"
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
