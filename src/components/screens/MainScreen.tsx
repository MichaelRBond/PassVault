import * as React from "react";

import MenuList from "../elements/MenuList";
import SearchBox from "../elements/SearchBox";

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
}

export default class extends React.Component<ComponentProps, {}> {
  public handleTestConnection(e: Event) {
    if (this.props.handleTestConnection) {
      this.props.handleTestConnection(e);
    }
  }

  public handleConfirm(e: Event) {
    if (this.props.handleConfirm) {
      this.props.handleConfirm(e);
    }
  }

  public getItems() {
    //
  }

  public render() {
    return (
      <div>
        <SearchBox
          id="search"
          placeholder="Search websites and notes"
        />
        <MenuList items={[{
            title: "Favorites",
            icon: "favorite",
            href: "#/favorites",
          },
          {
            title: "Website Passwords",
            icon: "laptop",
            href: "#/website-passwords",
          },
          {
            title: "Notes",
            icon: "notes",
            href: "#/notes",
          },
          {
            title: "Passwords Generator",
            icon: "lock",
            href: "#/password-generator",
        }]}/>
      </div>
    );
  }
}
