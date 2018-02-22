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
vault.setToken("45d73290-51f6-79da-c2d1-66ab5b8cb501");

storiesOf("MainScreen", module)
  .add("base", () => (
    <MainScreen vault={vault} />
  ))
  .add("with chrome", () => (
    <Chrome>
      <MainScreen vault={vault} />
    </Chrome>
  ));
