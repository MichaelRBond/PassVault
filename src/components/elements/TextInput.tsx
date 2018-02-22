import * as React from "react";
import {isNullOrUndefined} from "util";

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
        <input id={this.props.id} placeholder={placeholder} type="text" className="validate"/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
    return display;
  }

}
