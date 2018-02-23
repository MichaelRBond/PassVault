import { createHashHistory, History } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import Vault from "../vault";
import Chrome from "./Chrome";
import AddSecret from "./screens/AddSecret";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import PasswordGenerator from "./screens/PasswordGenerator";
import WelcomeScreen from "./screens/WelcomeScreen";

interface ComponentProps {
  vault: Vault;
}

interface ComponentState {
  history: History;
}

declare var window: any;

export default class PassVault extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: createHashHistory(),
    };

    const vaultUrl = window.localStorage.getItem("__passvault_vault_url");
    if (vaultUrl) {
      this.props.vault.setUrl(vaultUrl);
    }

    const vaultToken = window.localStorage.getItem("__passvault_vault_token");
    if (vaultToken) {
      this.props.vault.setUsername(window.localStorage.getItem("__passvault_vault_username"));
      this.props.vault.setToken(vaultToken);
    }

    if (vaultUrl) {
      if (vaultToken) {
        window.location = "#/main";
      } else {
        window.location = "#/login";
      }
    } else {
      window.location = "#/start";
    }
  }

  public handleSaveUrl(url: string) {
    this.props.vault.setUrl(url);
    window.location = "#/login";
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
            <Route path="/main">
              <MainScreen vault={this.props.vault} />
            </Route>
            <Route path="/passwordGenerator">
              <PasswordGenerator />
            </Route>
            <Route path="/saveSecret">
              <AddSecret vault={this.props.vault} />
            </Route>
          </Switch>
        </Chrome>
      </Router>
    );
    return display;
  }
}
