import * as React from "react";
import {Logger} from "../utils/logger";
import CancelButtonSmall from "./elements/CancelButton";
import Checkbox from "./elements/Checkbox";
import ConfirmButton from "./elements/ConfirmButton";
import TextInput from "./elements/TextInput";

const logger = new Logger("PassVault");

export default class Ballista extends React.Component<{}, {}> {

  public render() {
    const display = (
      <form>
        <p>Hello, World!</p>
        <ConfirmButton
          type="large"
          text="click me"
          onclickHandler={(): void => {
            logger.info("clicked!");
          }}
        />
        <CancelButtonSmall
          type="small"
          onclickHandler={(): void => {
            logger.info("Cancelled!");
          }}
        />
        <ConfirmButton
          type="small"
          text="click me"
          onclickHandler={(): void => {
            logger.info("clicked!");
          }}
        />
        <div>
          <Checkbox
            id="foo-checkbox"
            checked={true}
            label="Test Checkbox"
            onChangeHandler={(checked: any): void => {
              logger.info("checkbox changed!", checked);
            }}
          />
        </div>
        <div>
          <TextInput
            id="foo-text"
            label="test ..."
            onChangeHandler={(text: any): void => {
              logger.info("text changed!", text.currentTarget.value);
            }}
          />
        </div>
      </form>
    );
    return display;
  }
}
