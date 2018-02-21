import * as React from "react";
import * as ReactDOM from "react-dom";
import PassVault from "./components/PassVault";

require("es6-promise").polyfill();
require("./styles/app.scss");

declare var document: any; // TODO : type better????

ReactDOM.render(
  (<PassVault/>),
  document.getElementById("app"),
);
