import * as React from "react";

import "../../styles/MenuList.scss";

interface ComponentProps {
  items?: Item[];
}

interface Item {
    title: string;
    icon: string;
    href: string;
}

export default class extends React.Component<ComponentProps, {}> {

  public render() {
    const items = this.props.items.map((i) => {
      return (
          <a className="collection-item grey-text darken-4" href="#">
          <i className="material-icons left">{i.icon}</i>
          {i.title}
          <i className="material-icons right">chevron_right</i>
        </a>
      );
    });
    return (
      <div className="menu-list">
        <div className="collection">
          {items}
        </div>
      </div>
    );
  }
}
