import * as React from "react";

declare var $: any;

interface ComponentProps {
  id: string;
  label: string;
  onChangeHandler: any; // TODO : Type better
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  componentDidMount() {
    $(`#${this.props.id}`).material_textbox();
  }

  public render() {
    const display = (
      <div className="input-field col s6">
        <input id={this.props.id} type="text" className="validate"/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
    return display;
  }

}
