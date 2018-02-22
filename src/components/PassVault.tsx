import * as React from "react";
import Chrome from "./Chrome";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
// import MainScreen from "./screens/MainScreen";
import { Router, Route, Switch } from "react-router";
import { History, createHashHistory } from "history";
import Vault from "../vault";

interface ComponentState {
  vaultUrl: string;
  vaultClient: Vault;
  history: History;
}

declare var window: any;

export default class PassVault extends React.Component<{}, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      vaultClient: null,
      vaultUrl: "",
      history: createHashHistory(),
    };
  }

  public handleSaveUrl(url: string) {
    this.setState({
      ...this.state,
      vaultUrl: url,
      vaultClient: new Vault(url),
    });

    window.location = "/#/login";
  }

  public render() {
    const display = (
      <Router history={this.state.history}>
        <Chrome>
          <Switch>
            <Route path="/start">
              <WelcomeScreen handleConfirm={this.handleSaveUrl.bind(this)} />
            </Route>
            <Route path="/login">
              <LoginScreen vaultClient={this.state.vaultClient}/>
            </Route>
          </Switch>
        </Chrome>
      </Router>
    );
    return display;
  }
}
