import * as React from "react";
import {isNullOrUndefined} from "util";
import Input from "./input-text";

interface ComponentProps {
  id: string;
  label: string;
  onChangeHandler: any; // TODO : Type better
  placeholder?: string;
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const placeholder = isNullOrUndefined(this.props.placeholder) ? "" : this.props.placeholder;
    const display = (
      <div className="input-field col s6">
        <Input
          id={this.props.id}
          placeholder={placeholder}
          validate={true}
          onChangeHandler={this.props.onChangeHandler}
        />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
    return display;
  }

}
