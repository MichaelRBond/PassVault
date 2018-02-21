import * as React from "react";

interface ComponentProps {
  text: string;
  onclickHandler: any;
}

export default class extends React.Component<ComponentProps, {}> {
  render() {
    return (
      <div>
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-color--teal small-circle-button ">
      <i className="material-icons">refresh</i>
      </button>
      {this.props.text}
      </div>
    );
  }
};
