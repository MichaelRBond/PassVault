import * as React from "react";
import * as ReactDOM from "react-dom";
import PassVault from "./components/PassVault";

import * as promise from "es6-promise";

import './style.tsx';

declare var document: any; // TODO : type better????
promise.polyfill();

ReactDOM.render(
  (<PassVault/>),
  document.getElementById("app"),
);
