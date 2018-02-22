import * as React from "react";
import {isNullOrUndefined} from "util";

interface ComponentProps {
  id: string;
  onChangeHandler?: any; // TODO : Type better
  placeholder?: string;
  validate?: boolean;
}

export default class InputText extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const className = this.props.validate ? "validate" : "";
    const placeholder = isNullOrUndefined(this.props.placeholder) ? "" : this.props.placeholder;
    const display = (
      <input
        id={this.props.id}
        placeholder={placeholder}
        type="text"
        className={className}
        onChange={this.props.onChangeHandler}
      />
    );
    return display;
  }

}
