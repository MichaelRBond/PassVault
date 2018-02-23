import * as React from "react";
import {isNullOrUndefined} from "util";

const DEFAULT_COL_SIZE = 6;

interface ComponentProps {
  id: string;
  label?: string;
  onChangeHandler?: any; // TODO : Type better
  colSize?: number;
  value?: any;
}

export default class TextArea extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const columnSize = isNullOrUndefined(this.props.colSize) ? DEFAULT_COL_SIZE : this.props.colSize;
    const value = isNullOrUndefined(this.props.value) ? "" : this.props.value;
    const display = (
      <div className={`input-field col s${columnSize}`}>
        <textarea
          id={this.props.id}
          className="materialize-textarea"
          onChange={this.props.onChangeHandler}
          >
          {value}
        </textarea>
        {this.props.label && (
          <label htmlFor={this.props.id}>{this.props.label}</label>
        )}
      </div>
    );
    return display;
  }

}
