import * as React from "react";
import Chrome from "./Chrome";
import WelcomeScreen from "./screens/WelcomeScreen";

interface ComponentState {
  vaultUrl: string;
}

export default class PassVault extends React.Component<{}, ComponentState> {
  public render() {
    const display = (
      <Chrome>
        <WelcomeScreen handleConfirm={(url: string) => { this.setState({...this.state, vaultUrl: url}); }} />
      </Chrome>
    );
    return display;
  }
}
