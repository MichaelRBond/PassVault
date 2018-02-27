import * as React from "react";
import {Config} from "../../config";
import {changeWindowLocation} from "../../utils/browser";
import {generatePassword} from "../../utils/crypto";
import Checkbox from "../elements/Checkbox";
import ConfirmButton from "../elements/ConfirmButton";
import RoundButton from "../elements/RoundButton";
import TextInput from "../elements/TextInput";

const logo = require("./passvaultlogo.png");

interface ComponentState {
    generatedPassword: string;
    enableNumbers: boolean;
    enableCapitals: boolean;
    enableLowercase: boolean;
    enableSymbols: boolean;
    passwordLength: number;
}

export default class PasswordGenerator extends React.Component<{}, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
        generatedPassword: generatePassword(12, {
            capitals: true,
            lowercase: true,
            numbers: true,
        }),
        enableNumbers: true,
        enableCapitals: true,
        enableLowercase: true,
        enableSymbols: false,
        passwordLength: 12,
    };
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
              <div className="col s12 center-align pad-top-20">
                <TextInput
                  id="generatedPassword"
                  validate={false}
                  colSize={10}
                  value={this.state.generatedPassword}
                />
                <RoundButton onclickHandler={() => this.updatePassword()} margin={20}/>
              </div>
              <div className="col s12 center-align">
                <TextInput
                  id="passwordLength"
                  label="Length"
                  type="number"
                  validate={true}
                  colSize={12}
                  value={this.state.passwordLength}
                  active={true}
                  onChangeHandler={(e: any) => this.setPasswordLength(parseInt(e.currentTarget.value, 10))}
                />
              </div>
              <div className="col s12">
                <p>
                  <Checkbox
                    label="A-Z"
                    onChangeHandler={(enabled: boolean) => this.setEnableCaptials(enabled)}
                    checked={this.state.enableCapitals}
                  />
                </p>
                <p>
                  <Checkbox
                    label="a-z"
                    onChangeHandler={(enabled: boolean) => this.setEnableLowercase(enabled)}
                    checked={this.state.enableLowercase}
                  />
                </p>
                <p>
                  <Checkbox
                    label="0-9"
                    onChangeHandler={(enabled: boolean) => this.setEnableNumbers(enabled)}
                    checked={this.state.enableNumbers}
                  />
                </p>
                <p>
                  <Checkbox
                    label="!@#$%&amp;"
                    onChangeHandler={(enabled: boolean) => this.setEnableSymbols(enabled)}
                    checked={this.state.enableSymbols}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col center-align pad-top-50">
            <ConfirmButton
              text="Main Page"
              onclickHandler={() => changeWindowLocation(Config.PAGE_MAIN)}
              type=""
            />
          </div>
        </div>
      </main>
    );
  }

  private updatePassword() {
    this.setState({
      ...this.state,
      generatedPassword: generatePassword(this.state.passwordLength, {
        lowercase: this.state.enableLowercase,
        capitals: this.state.enableCapitals,
        numbers: this.state.enableNumbers,
        symbols: this.state.enableSymbols,
      }),
    });
  }

  private setEnableCaptials(enableCapitals: boolean) {
    this.setState({
      ...this.state,
      enableCapitals,
    });
  }

  private setEnableLowercase(enableLowercase: boolean) {
    this.setState({
      ...this.state,
      enableLowercase,
    });
  }

  private setEnableNumbers(enableNumbers: boolean) {
    this.setState({
      ...this.state,
      enableNumbers,
    });
  }

  private setEnableSymbols(enableSymbols: boolean) {
    this.setState({
      ...this.state,
      enableSymbols,
    });
  }

  private setPasswordLength(length: number) {
    this.setState({
      ...this.state,
      passwordLength: length,
    });
  }
}
