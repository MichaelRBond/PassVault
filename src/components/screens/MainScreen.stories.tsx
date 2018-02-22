import { storiesOf } from "@storybook/react";
import * as React from "react";
import {HttpClient} from "../../utils/http";
import Vault from "../../vault";
import Chrome from "../Chrome";
import MainScreen from "./MainScreen";

const httpClient = new HttpClient();
const vault = new Vault(httpClient);
vault.setUsername("test");
vault.setUrl("http://127.0.0.1:8200");

storiesOf("MainScreen", module)
  .add("base", () => (
    <MainScreen vault={vault} />
  ))
  .add("with chrome", () => (
      <VaultLogin />
  ));

class VaultLogin extends React.Component<{}, {vault: Vault}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      vault,
    };
  }

  public async componentWillMount() {
    await this.state.vault.login("test", "test");
    this.setState({
      ...this.state,
      vault,
    });
  }

  public render() {
    if (!this.state.vault.isAuthenticated()) {
      return null;
    }
    return (
      <Chrome>
        <MainScreen vault={vault} key={this.state.vault.isAuthenticated().toString()} />
      </Chrome>
    );
  }

}
