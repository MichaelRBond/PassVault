import { storiesOf } from "@storybook/react";
import * as React from "react";
import PassVault from "./PassVault";

storiesOf("PassVault", module)
  .add("full", () => (
    <div style={{width: "350px", height: "520px"}}>
      <PassVault />
    </div>
  ));
