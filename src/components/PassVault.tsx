import * as React from "react";
import {Logger} from "../utils/logger";
import CancelButtonSmall from "./elements/CancelButton";
import ConfirmButton from "./elements/ConfirmButton";

const logger = new Logger("PassVault");

export default class Ballista extends React.Component<{}, {}> {

  public render() {
    const display = (
      <div>
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
      </div>
    );
    return display;
  }
}
