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
        onClick={this.props.onclickHandler}
        className={`confirm-button-${this.props.type}`}
      >
        {this.props.text}
      </button>
    );
    return display;
  }

}
