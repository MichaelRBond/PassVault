import * as React from "react";

interface ComponentProps {
  id: string;
  label: string;
  onChangeHandler: any; // TODO : Type better
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    const display = (
      <div className="mdl-textfield mdl-js-textfield">
        <input
          className="mdl-textfield__input"
          type="text"
          id={this.props.id}
          onChange={this.props.onChangeHandler}
        />
        <label
          className="mdl-textfield__label"
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
      </div>
    );
    return display;
  }

}
