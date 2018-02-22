import { storiesOf } from "@storybook/react";
import * as React from "react";
import {HttpClient} from "../../utils/http";
import Vault from "../../vault";
import Chrome from "../Chrome";
import WelcomeScreen from "./WelcomeScreen";

const httpClient = new HttpClient();
const vault = new Vault(httpClient);

storiesOf("WelcomeScreen", module)
  .add("base", () => (
    <WelcomeScreen
      vault={vault}
      handleConfirm={() => {/**/}}/>
  ))
  .add("with chrome", () => (
      <Chrome>
        <WelcomeScreen vault={vault} handleConfirm={() => {/**/}}/>
      </Chrome>
  ));
