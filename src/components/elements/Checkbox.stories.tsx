import { storiesOf } from "@storybook/react";
import * as React from "react";
import {Logger} from "../../utils/logger";
import Checkbox from "./Checkbox";

const logger = new Logger("Checkbox Stories");

storiesOf("Checkbox", module)
  .add("with text", () => (
    <Checkbox
      id="foo-checkbox"
      checked={true}
      label="Test Checkbox"
      onChangeHandler={(checked: any): void => {
        logger.info("checkbox changed!", checked);
    }}
    />
  ));
