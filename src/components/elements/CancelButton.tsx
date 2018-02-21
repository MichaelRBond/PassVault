import * as React from "react";

interface ComponentProps {
  type: "small" | "large";
  onclickHandler: any; // TODO : Type better
}

export default class CancelButtonSmall extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const display = (
      <button
        onClick={this.props.onclickHandler}
        className={`cancel-button-${this.props.type}`}
      >
        Cancel
      </button>
    );
    return display;
  }

}
