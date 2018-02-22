import { storiesOf } from "@storybook/react";
import * as React from "react";
import Chrome from "../Chrome";
import LoginScreen from "./LoginScreen";

storiesOf("LoginScreen", module)
  .add("base", () => (
    <LoginScreen />
  ))
  .add("with chrome", () => (
      <Chrome>
        <LoginScreen />
      </Chrome>
  ));
