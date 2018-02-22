import { storiesOf } from "@storybook/react";
import * as React from "react";
import Chrome from "../Chrome";
import LoginScreen from "./LoginScreen";
import Vault from "../../vault";

storiesOf("LoginScreen", module)
  .add("base", () => (
    <LoginScreen vaultClient={new Vault("")}/>
  ))
  .add("with chrome", () => (
      <Chrome>
        <LoginScreen vaultClient={new Vault("")}/>
      </Chrome>
  ));
