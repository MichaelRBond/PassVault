import * as React from "react";

interface ComponentProps {
  onclickHandler: any; // TODO : Type better
}

export default class CancelButtonSmall extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const display = (
      <a
        onClick={this.props.onclickHandler}
        className="waves-effect waves-light btn grey lighten-1"
      >
        Cancel
      </a>
    );
    return display;
  }

}
