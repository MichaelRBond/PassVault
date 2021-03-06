import * as React from "react";

import "../../styles/MenuList.scss";

interface ComponentProps {
  items: Item[];
}

interface Item {
    title: string;
    icon: string;
    content: any;
    url?: string;
}

export default class extends React.Component<ComponentProps, {}> {
  public componentDidMount() {
    ($(".collapsible") as any).collapsible();
  }

  public render() {
    const items = this.props.items.map((i) => {
      return (
        <li key={`${i.title}-menu-list`}>
          <div className="collapsible-header">
            <i className="material-icons left teal-text">{i.icon}</i>
            {/* FIXME: OMG. So. Bad. */}
            { i.url ? (<a className="black-text" href={i.url}>{i.title}</a>) : i.title }
            <i className="material-icons right">chevron_right</i>
          </div>
          <div className="collapsible-body">
            {i.content}
          </div>
        </li>
      );
    });
    return (
      <ul className="collapsible" data-collapsible="accordion">
        {items}
      </ul>
    );
  }
}
