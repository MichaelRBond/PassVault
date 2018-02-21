import * as React from "react";
import {Logger} from "../utils/logger";
import ConfirmButtonLarge from "./elements/ConfirmButtonLarge";

const logger = new Logger("PassVault");

export default class Ballista extends React.Component<{}, {}> {

  public render() {
    const display = (
      <div>
        <p>Hello, World!</p>
        <ConfirmButtonLarge
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
