import { storiesOf } from "@storybook/react";
import * as React from "react";
import {HttpClient} from "../utils/http";
import Vault from "../vault";
import PassVault from "./PassVault";

const httpClient = new HttpClient();
const vault = new Vault(httpClient);

storiesOf("PassVault", module)
  .add("full", () => (
    <div style={{width: "350px", height: "520px"}}>
      <PassVault vault={vault} />
    </div>
  ));
