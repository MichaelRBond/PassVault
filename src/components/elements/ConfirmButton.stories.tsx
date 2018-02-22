import { storiesOf } from "@storybook/react";
import * as React from "react";
import {Logger} from "../../utils/logger";
import ConfirmButtonLarge from "./ConfirmButton";

const logger = new Logger("ConfirmButtonLarge Story");

storiesOf("Confirm Button", module)
  .add("Large", () => (
    <ConfirmButtonLarge
      text="confirm"
      onclickHandler={(): void => {
        logger.info("Cancel button clicked!");
    }}
    />
  ));
