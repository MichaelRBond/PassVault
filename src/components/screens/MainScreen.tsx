import * as React from "react";
import {PassVaultModel} from "../../models/passvault";
import { PassVaultEvent } from "../../models/passvault-event";
import ConfirmButton from "../elements/ConfirmButton";
import MenuList from "../elements/MenuList";
import PassVaultSecret from "../elements/PassVaultSecret";
import SearchBox from "../elements/SearchBox";

interface SearchResults {
  key: string;
  folder: string;
  fullPath: string;
}

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
  passvault: PassVaultModel;
}

interface ComponentState {
  favorites: any;
  notes: string;
  folders: any;
  searchResults: SearchResults[];
}

declare var window: any;

export default class extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      favorites: "Loading ...",
      notes: "Loading ...",
      folders: "Loading ...",
      searchResults: null,
    };
  }

  public async componentDidMount(): Promise<void> {
    const [favorites, notes, folders] = await Promise.all([
      this.getFavorites(),
      this.getNotes(),
      this.getFolders(),
    ]);
    this.setState({
      ...this.state,
      favorites,
      notes,
      folders,
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

  public async search(e: PassVaultEvent) {
    if (!e || !e.target) {
      return;
    }

    const query = e.target.value;

    if (query.length === 0) {
      return this.setState({
        ...this.state,
        searchResults: null,
      });
    }

    const folders = await this.props.passvault.getFolders();

    const listPromises = folders.map((folder) => {
      return this.props.passvault.getSecretNamesFromFolder(folder);
    });

    const listResponses = await Promise.all(listPromises);

    const results = listResponses
      .reduce((p, c) => {
        p = p.concat(c);
        return p;
      }, [])
      .map((r, i) => {
        return {
          key: r,
          folder: folders[i],
          fullPath: `passwords/${folders[i]}${r}`,
        };
      });

    const filtered = results.filter((r) => {
      return r.fullPath.includes(query);
    });

    this.setState({
      ...this.state,
      searchResults: filtered,
    });
  }

  public render() {
    let searchResults = null;
    let menuList = null;

    if (this.state.searchResults) {
      searchResults = (
        <div>
        {this.state.searchResults.map((results) => {
          return <PassVaultSecret
            folder={results.folder}
            secret={results.key}
            passvault={this.props.passvault}
          />;
        })}
        </div>
      );
    } else {
      menuList =  (
        <div>
          <MenuList items={[{
              title: "Favorites",
              icon: "favorite",
              content: this.state.favorites,
            },
            {
              title: "Website Passwords",
              icon: "laptop",
              content: <ul className="collapsible" data-collapsible="accordion"> {this.state.folders} </ul>,
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
              url: "#/passwordGenerator",
            },
          ]}/>
          <div className="col center-align pad-top-50">
              <ConfirmButton
                text="Add Password"
                onclickHandler={() => window.location = "#/saveSecret"}
                type=""
              />
          </div>
        </div>
      );
    }

    return (
      <div>
        <SearchBox
          id="search"
          placeholder="Search websites and notes"
          onChangeHandler={(e: PassVaultEvent) => this.search(e)}
        />
        {searchResults}
        {menuList}
      </div>
    );
  }

  // TODO : Type return better
  private async getFavorites(): Promise<any> {
    const favorites = await this.props.passvault.getFavorites();
    return favorites.map((fav) => {
      const [folder, secret] = fav.split("%%%");
      return (
        <PassVaultSecret
          folder={folder}
          secret={secret}
          passvault={this.props.passvault}
        />
        );
      });
    }

  // TODO : Type return better
  private async getFolders(): Promise<any> {
    const folders = await this.props.passvault.getFolders();
    const folderPromises = folders.map(async (folder) => {
      const secrets = await this.props.passvault.getSecretNamesFromFolder(folder);
      return (
          <li>
            <div className="collapsible-header"><i className="material-icons prefix">folder</i>{folder}</div>
            <div className="collapsible-body" key={folder}>
              {
                secrets.map((secret) => {
                  return (
                    <PassVaultSecret
                    folder={folder}
                    secret={secret}
                    passvault={this.props.passvault}
                  />
                  );
                })
              }
            </div>
          </li>
      );
    });
    const ret = await Promise.all(folderPromises);
    return ret;
  }

  private async getNotes(): Promise<string> {
    return "These are my notes";
  }
}
