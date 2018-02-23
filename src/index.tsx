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

ReactDOM.render(
  (
    <PassVault
      vault={vaultClient}
    />
  ),
  document.getElementById("app"),
);
