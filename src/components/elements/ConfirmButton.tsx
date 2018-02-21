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
      <a
        className={`waves-effect waves-light btn`}
        onClick={this.props.onclickHandler}
        >
        {this.props.text}
      </a>
    );
    return display;
  }

}
