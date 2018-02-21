import * as React from "react";

interface ComponentProps {
  text: string;
  onclickHandler: any;
}

export default class RoundButton extends React.Component<ComponentProps, any> {
  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div>
      <a className="btn-floating teal">
        <i className="material-icons">refresh</i>
      </a>
      {this.props.text}
      </div>
    );
  }
}
