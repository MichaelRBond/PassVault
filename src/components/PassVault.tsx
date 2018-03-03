import { createHashHistory, History } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import {Config} from "../config";
import {PassVaultModel} from "../models/passvault";
import {changeWindowLocation, localStorageGetItem} from "../utils/browser";
import Vault from "../vault";
import Chrome from "./Chrome";
import AddSecret from "./screens/AddSecret";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import PasswordGenerator from "./screens/PasswordGenerator";
import WelcomeScreen from "./screens/WelcomeScreen";

interface ComponentProps {
  passvault: PassVaultModel;
  vault: Vault;
}

interface ComponentState {
  history: History;
}

export default class PassVault extends React.Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: createHashHistory(),
    };

    const vaultUrl = localStorageGetItem("__passvault_vault_url");
    if (vaultUrl) {
      this.props.passvault.setUrl(vaultUrl);
    }

    const vaultToken = localStorageGetItem("__passvault_vault_token");
    if (vaultToken) {
      this.props.passvault.setUsername(localStorageGetItem("__passvault_vault_username"));
      this.props.passvault.setToken(vaultToken);
    }

    if (vaultUrl) {
      if (vaultToken) {
        changeWindowLocation(Config.PAGE_MAIN);
      } else {
        changeWindowLocation(Config.PAGE_LOGIN);
      }
    } else {
      changeWindowLocation(Config.PAGE_START);
    }
  }

  public handleSaveUrl(url: string) {
    this.props.passvault.setUrl(url);
    changeWindowLocation(Config.PAGE_LOGIN);
  }

  public render() {
    const display = (
      <Router history={this.state.history} key="router">
        <Chrome key="chrome">
          <Switch key="switch">
            <Route path="/start" key="start">
              <WelcomeScreen
                passvault={this.props.passvault}
                vault={this.props.vault}
                handleConfirm={this.handleSaveUrl.bind(this)} />
            </Route>
            <Route path="/login" key="login">
              <LoginScreen passvault={this.props.passvault}/>
            </Route>
            <Route path="/main" key="main">
              <MainScreen passvault={this.props.passvault} />
            </Route>
            <Route path="/passwordGenerator" key="passwordGenerator">
              <PasswordGenerator />
            </Route>
            <Route path="/saveSecret" key="saveSecret">
              <AddSecret passvault={this.props.passvault} />
            </Route>
          </Switch>
        </Chrome>
      </Router>
    );
    return display;
  }
}
