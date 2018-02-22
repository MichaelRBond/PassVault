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
            content: "foo",
          },
          {
            title: "Website Passwords",
            icon: "laptop",
            content: "bar",
          },
          {
            title: "Notes",
            icon: "notes",
            content: "oof",
          },
          {
            title: "Passwords Generator",
            icon: "lock",
            content: "rab",
          },
        ]}/>
      </div>
    );
  }
}
