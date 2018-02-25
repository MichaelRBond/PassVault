import * as React from "react";
import {isNullOrUndefined} from "util";
import Input from "./input-text";

const DEFAULT_COL_SIZE = 6;

interface ComponentProps {
  id: string;
  label?: string;
  onChangeHandler?: any; // TODO : Type better
  placeholder?: string;
  colSize?: number;
  type?: string;
  validate?: boolean;
  active?: boolean;
  value?: any;
  inline?: boolean;
  tabIndex?: number;
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const active = isNullOrUndefined(this.props.active) ? "" : "active";
    const validate = this.props.validate ? true : false;
    const columnSize = isNullOrUndefined(this.props.colSize) ? DEFAULT_COL_SIZE : this.props.colSize;
    const placeholder = isNullOrUndefined(this.props.placeholder) ? "" : this.props.placeholder;
    const inline = !!this.props.inline;
    const display = (
      <div className={(inline) ? "input-field inline" : `input-field col s${columnSize}`}>
        <Input
          id={this.props.id}
          placeholder={placeholder}
          validate={validate}
          onChangeHandler={this.props.onChangeHandler}
          type={this.props.type}
          value={this.props.value}
          tabIndex={this.props.tabIndex}
        />
        {this.props.label && (
          <label htmlFor={this.props.id} className={`${active}`}>{this.props.label}</label>
        )}
      </div>
    );
    return display;
  }

}
