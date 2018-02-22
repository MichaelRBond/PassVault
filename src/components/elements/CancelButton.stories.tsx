import { storiesOf } from "@storybook/react";
import * as React from "react";
import {Logger} from "../../utils/logger";
import CancelButton from "./CancelButton";

const logger = new Logger("CancelButton Story");

storiesOf("Cancel Button", module)
  .add("with text", () => (
    <CancelButton
      onclickHandler={(): void => {
        logger.info("Cancel button clicked!");
    }}
    />
  ));
