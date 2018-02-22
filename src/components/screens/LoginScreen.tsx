import * as React from "react";
import Checkbox from "../elements/Checkbox";
import ConfirmButton from "../elements/ConfirmButton";
import TextInput from "../elements/TextInput";
import SelectBox from "../elements/SelectBox";
import Vault from "../../vault";

const logo = require("./passvaultlogo.png");

interface ComponentProps {
  vaultClient: Vault;
}

declare var window: any;

export default class LoginScreen extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    if (!props.vaultClient) {
      window.location = "/#/start";
    }
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
                            selected: true
                          },
                          {
                            label: "Github"
                          },
                          {
                            label: "Token"
                          },
                          {
                            label: "Userpass"
                          }
                        ]}/>
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
                        <ConfirmButton
                          text="Login"
                          onclickHandler={undefined}
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
