import * as React from "react";
import * as uuidv1 from "uuid/v1";

declare var document: any;

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
      <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={this.state.id}>
        <input
          type="checkbox"
          id={this.state.id}
          className="mdl-checkbox__input"
          checked={this.state.checked}
          onChange={(e) => this.handleChange(this.state.id)}
        />
        <span className="mdl-checkbox__label">{this.props.label}</span>
      </label>
    );

    return display;
  }

  private handleChange(id: string): any {
    const checkbox = this.getCheckbox();
    // console.log(checkbox.parentElement);
    this.setState({
      ...this.state,
      checked: checkbox.parentElement.MaterialCheckbox.inputElement_.checked,
    });
    return this.props.onChangeHandler(!this.state.checked);
  }

  private getCheckbox(): any {
    return document.querySelector(`#${this.state.id}`);
  }

}
