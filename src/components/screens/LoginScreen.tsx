import * as React from "react";
import Checkbox from "../elements/Checkbox";
import TextInput from "../elements/TextInput";

const logo = require("./passvaultlogo.png");

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
}

interface ComponentState {
  url: string;
}

export default class LoginScreen extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      url: "",
    };

    this.updateUrl = this.updateUrl.bind(this);
  }

  public handleTestConnection(e: Event) {
    if (this.props.handleTestConnection) {
      this.props.handleTestConnection(e);
    }
  }

  public handleConfirm(e: Event) {
    if (this.props.handleConfirm) {
      this.props.handleConfirm(this.state.url);
    }
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
                <div className="col s12">
                    <div className="input-field col s12 center-align">
                        <select>
                            <option value="" disabled selected>Select your auth type</option>
                            <option value="1">Userpass</option>
                            <option value="1">Otka</option>
                            <option value="2">Github</option>
                            <option value="3">Token</option>
                        </select>
                    </div>
                </div>
                <div className="col s12 center-align pad-top-20">
                  <TextInput
                      id="username"
                      label="Username"
                      validate={true}
                      colSize={12}
                    />
                </div>
                <div className="col s12 center-align">
                    <TextInput
                      id="password"
                      label="Password"
                      type="password"
                      validate={true}
                      colSize={12}
                    />
                    <div className="col s12 center-align">
                        <Checkbox
                          label="Remember User?"
                          onChangeHandler={undefined}
                          checked={true}
                        />
                        <Checkbox
                          label="Remember Password?"
                          onChangeHandler={undefined}
                          checked={false}
                        />
                    </div>
                    <div className="col s12 center-align pad-top-50">
                        <a className="waves-effect waves-light btn big-button">Login</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
