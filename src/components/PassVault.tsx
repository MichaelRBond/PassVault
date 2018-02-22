import { createHashHistory, History } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import Vault from "../vault";
import Chrome from "./Chrome";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
// import MainScreen from "./screens/MainScreen";

interface ComponentProps {
  vault: Vault;
}

interface ComponentState {
  vaultClient: Vault;
  history: History;
}

declare var window: any;

export default class PassVault extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      vaultClient: null,
      history: createHashHistory(),
    };
  }

  public handleSaveUrl(url: string) {
    this.props.vault.setUrl(url);
    window.location = "/#/login";
  }

  public render() {
    const display = (
      <Router history={this.state.history}>
        <Chrome>
          <Switch>
            <Route path="/start">
              <WelcomeScreen vault={this.props.vault} handleConfirm={this.handleSaveUrl.bind(this)} />
            </Route>
            <Route path="/login">
              <LoginScreen vaultClient={this.props.vault}/>
            </Route>
          </Switch>
        </Chrome>
      </Router>
    );
    return display;
  }
}
