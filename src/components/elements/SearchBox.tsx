import * as React from "react";
import Input from "./input-text";
import "./SearchBox.scss";

interface ComponentProps {
  placeholder: string;
  id: string;
  onChangeHandler?: any;
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="search-box input-field col s6">
        <i className="material-icons grey-text darken-4 prefix">search</i>
        <Input
          id={this.props.id}
          placeholder={this.props.placeholder}
          validate={true}
          onChangeHandler={this.props.onChangeHandler}
        />
      </div>
    );
  }

}
