import * as React from "react";

interface Option {
    value?: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
}

interface ComponentProps {
  id: string;
  options: Option[];
  onChangeHandler?: any; // TODO : Type better
}

export default class TextInput extends React.Component<ComponentProps, {}> {

  constructor(props: ComponentProps) {
    super(props);
  }

  public componentDidMount() {
      ($(`#${this.props.id} > select`) as any).material_select();
  }

  public render() {
    const display = (
        <div className="input-field col s12 center-align" id={this.props.id}>
            <select>
                {
                    this.props.options.map((option) => {
                        return (
                            <option
                                disabled={option.disabled}
                                selected={option.selected}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
    return display;
  }

}
