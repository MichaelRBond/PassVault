import * as React from "react";
import Vault from "../../vault";
import MenuList from "../elements/MenuList";
import SearchBox from "../elements/SearchBox";

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
  vault: Vault;
}

interface ComponentState {
  favorites: string;
  notes: string;
}

export default class extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      favorites: "Loading ...",
      notes: "Loading ...",
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({
      ...this.state,
      favorites: await this.getFavorites(),
      notes: await this.getNotes(),
    });
  }

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
            content: this.state.favorites,
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
            url: "http://slashdot.org",
          },
        ]}/>
      </div>
    );
  }

  // TODO : Type return better
  private async getFavorites(): Promise<string> {
    // const favorites = ["stings", "gtos", "tototot"];

    return "these are my favosdfsfdrites";
  }

  private async getNotes(): Promise<string> {
    return "These are my notes";
  }
}
