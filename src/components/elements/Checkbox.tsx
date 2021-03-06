import * as React from "react";
import * as uuidv1 from "uuid/v1";
import {getElementById} from "../../utils/browser";

interface ComponentProps {
  id?: string;
  checked?: boolean;
  label: string;
  onChangeHandler: any; // TODO : Type better
}

interface ComponentState {
  checked: boolean;
  id: string;
}

export default class Checkbox extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      checked: this.props.checked ? this.props.checked : false,
      id: this.props.id ? this.props.id : uuidv1(),
    };
  }

  public render() {

    const display = (
      <span>
        <input
          type="checkbox"
          id={this.state.id}
          checked={this.state.checked}
          className="filled-in"
          onChange={(e) => this.handleChange(this.state.id)}
        />
        <label htmlFor={this.state.id}>{this.props.label}</label>
      </span>
    );

    return display;
  }

  private handleChange(id: string): any {
    const checkbox = getElementById(this.state.id);
    this.setState({
      ...this.state,
      checked: checkbox.checked,
    });
    return this.props.onChangeHandler(!this.state.checked);
  }
}
