import * as promise from "es6-promise";
import * as React from "react";
import * as ReactDOM from "react-dom";
import PassVault from "./components/PassVault";
import {HttpClient} from "./utils/http";
import Vault from "./vault/index";

import "./style.tsx";

declare var document: any; // TODO : type better????
promise.polyfill();

const httpClient = new HttpClient();
const vaultClient = new Vault(httpClient);

// FIXME: THis is only for testing. Remove once login is working
// Until we have login working these need to be hard coded
vaultClient.setToken("45d73290-51f6-79da-c2d1-66ab5b8cb501"); // TODO : put your vault token here
vaultClient.setUsername("test");
vaultClient.setUrl("http://127.0.0.1:8200");

ReactDOM.render(
  (
    <PassVault
      vault={vaultClient}
    />
  ),
  document.getElementById("app"),
);
