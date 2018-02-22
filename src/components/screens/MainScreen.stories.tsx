import { storiesOf } from "@storybook/react";
import * as React from "react";
import {HttpClient} from "../../utils/http";
import Vault from "../../vault";
import Chrome from "../Chrome";
import MainScreen from "./MainScreen";

const httpClient = new HttpClient();
const vault = new Vault(httpClient);

storiesOf("MainScreen", module)
  .add("base", () => (
    <MainScreen vault={vault} />
  ))
  .add("with chrome", () => (
      <Chrome>
        <MainScreen vault={vault} />
      </Chrome>
  ));
