import * as React from "react";

interface ComponentProps {
  type: "small" | "large";
  text: string;
  onclickHandler: any; // TODO : Type better
}

export default class ConfirmButtonLarge extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const display = (
      <button
        className={`mdl-button mdl-js-button mdl-button--raised mdl-button--colored confirm-button-${this.props.type}`}
        onClick={this.props.onclickHandler}
        >
        {this.props.text}
      </button>
    );
    return display;
  }

}
