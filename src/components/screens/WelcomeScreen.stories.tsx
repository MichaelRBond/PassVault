import { storiesOf } from "@storybook/react";
import * as React from "react";

import Chrome from "../Chrome";
import WelcomeScreen from "./WelcomeScreen";

storiesOf("WelcomeScreen", module)
  .add("base", () => (
    <WelcomeScreen handleConfirm={() => {}}/>
  ))
  .add("with chrome", () => (
      <Chrome>
        <WelcomeScreen handleConfirm={() => {}}/>
      </Chrome>
  ));
