import * as React from "react";

import './SearchBox.scss';

interface ComponentProps {
  placeholder: string;
  id: string;
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="search-box input-field col s6">
        <i className="material-icons grey-text darken-4 prefix">search</i>
        <input placeholder={this.props.placeholder} id={this.props.id} type="text" className="validate" />
      </div>
    );
  }

}
