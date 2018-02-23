import * as React from "react";

export interface HiddenProps {
  when: boolean;
  classes?: string;
  children?: any;
  id?: string;
}

export default class Hidden extends React.Component<HiddenProps, any> {
  public render() {
    const { when, classes, children , id} = this.props;
    let classList = classes || "";
    const renderId = id || "";
    if (when) {
      classList = `${classList} hidden`;
    }
    return <div className={classList} id={renderId}>{children}</div>;
  }
}
