import * as React from "react";
import {isNullOrUndefined} from "util";

interface ComponentProps {
  text: string;
  onclickHandler: any; // TODO : Type better
  type?: string;
  disable?: boolean;
}

export default class ConfirmButtonLarge extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const buttonType = isNullOrUndefined(this.props.type) ? "" : this.props.type;
    const disabled = this.props.disable ? "disabled" : "";
    const display = (
      <a
        className={`waves-effect waves-light btn ${buttonType} ${disabled}`}
        onClick={this.props.onclickHandler}
        >
        {this.props.text}
      </a>
    );
    return display;
  }

}
