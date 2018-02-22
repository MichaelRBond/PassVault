import { storiesOf } from "@storybook/react";
import * as React from "react";
import {HttpClient} from "../../utils/http";
import Vault from "../../vault";
import Chrome from "../Chrome";
import LoginScreen from "./LoginScreen";

const httpClient = new HttpClient();

storiesOf("LoginScreen", module)
  .add("base", () => (
    <LoginScreen vaultClient={new Vault(httpClient)}/>
  ))
  .add("with chrome", () => (
      <Chrome>
        <LoginScreen vaultClient={new Vault(httpClient)}/>
      </Chrome>
  ));
