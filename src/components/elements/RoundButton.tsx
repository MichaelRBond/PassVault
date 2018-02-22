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
      <h6>
        <a className="btn-floating teal" onClick={this.props.onclickHandler}>
          <i className="small material-icons">refresh</i>
        </a>  {this.props.text}
      </h6>
    );
  }
}
