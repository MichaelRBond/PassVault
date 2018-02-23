import * as React from "react";

interface ComponentProps {
  text?: string;
  onclickHandler: any;
  margin?: number;
}

export default class RoundButton extends React.Component<ComponentProps, any> {
  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    return (
      <span>
        <a
          className="btn-floating teal"
          onClick={this.props.onclickHandler}
          style={{"margin-top": ((this.props.margin) ? `${this.props.margin}px` : "0px")}}
        >
          <i className="small material-icons">refresh</i>
        </a>  {this.props.text && this.props.text}
      </span>
    );
  }
}
