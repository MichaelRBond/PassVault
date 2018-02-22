import { storiesOf } from "@storybook/react";
import "jquery";
import "materialize-loader";
import * as React from "react";
import {Logger} from "../../utils/logger";
import Chrome from "../Chrome";
import TextInput from "./TextInput";
const logger = new Logger("TextInput Story");

require("../../../node_modules/materialize-css/dist/js/materialize.min.js");

storiesOf("TextInput", module)
  .add("with chrome", () => (
      <Chrome>
        <TextInput
          id="Input"
          label="Input"
          onChangeHandler={(text: any): void => {
            logger.info("text changed!", text.currentTarget.value);
          }}
        />
      </Chrome>
  ))
  .add("with chrome, with placeholder", () => (
      <Chrome>
        <TextInput
          id="Input"
          label="Input"
          placeholder="placeholder text"
          onChangeHandler={(text: any): void => {
            logger.info("text changed!", text.currentTarget.value);
          }}
        />
      </Chrome>
  ));
