import * as promise from "es6-promise";
import * as React from "react";
import * as ReactDOM from "react-dom";
import PassVault from "./components/PassVault";
import { PassVaultModel } from "./models/passvault";
import {HttpClient} from "./utils/http";
import Vault from "./vault/index";

import "./components/icon32.png";
import "./style.tsx";

declare var document: any; // TODO : type better????
promise.polyfill();

const httpClient = new HttpClient();
const vaultClient = new Vault(httpClient);
const passvault = new PassVaultModel(vaultClient);

ReactDOM.render(
  (
    <PassVault
      passvault={passvault}
      vault={vaultClient}
    />
  ),
  document.getElementById("app"),
);
