import * as React from "react";
import {Config} from "../../config";
import {PassVaultModel, Secret} from "../../models/passvault";
import { PassVaultEvent } from "../../models/passvault-event";
import {changeWindowLocation} from "../../utils/browser";
import {favoritesDelimiter} from "../../utils/passvault";
import ConfirmButton from "../elements/ConfirmButton";
import MenuList from "../elements/MenuList";
import PassVaultSecret from "../elements/PassVaultSecret";
import SearchBox from "../elements/SearchBox";

interface SearchResults {
  key: string;
  folder: string;
  fullPath: string;
  secret: Secret;
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

export default class extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);

    this.state = {
      favorites: "Loading ...",
      notes: "Loading ...",
      folders: "Loading ...",
      searchResults: null,
    };

    this.render = this.render.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    const favorites = await this.getFavorites();
    const notes = await this.getNotes();
    const folders = await this.getFoldersList();
    this.setState({
      ...this.state,
      favorites,
      folders,
      notes,
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
      return this.props.passvault.getSecretsFromFolder(folder);
    });

    const listResponses = await Promise.all(listPromises);

    const results = listResponses
      .reduce((p, c) => {
        p = p.concat(c);
        return p;
      }, [])
      .map((r, i) => {
        return {
          secret: r,
          key: r.name,
          folder: folders[i],
          fullPath: `passwords/${folders[i]}${r.name}`,
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

    if (!this.props.passvault.isAuthenticated()) {
      changeWindowLocation(Config.PAGE_START);
    }

    let searchResults = null;
    let menuList = null;

    if (this.state.searchResults) {
      searchResults = (
        <div key="searchResults">
        {this.state.searchResults.map((result) => {
            return <PassVaultSecret
              folder={result.folder}
              secret={result.secret}
              passvault={this.props.passvault}
              key={result.folder}
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
              url: Config.PAGE_PASSWORD_GENERATOR,
            },
          ]}/>
          <div className="col center-align pad-top-50">
              <ConfirmButton
                text="Add Password"
                onclickHandler={() => changeWindowLocation(Config.PAGE_SECRET)}
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
    const favoritesPromises = favorites.map(async (fav) => {
      const [folder, secretName] = fav.split(favoritesDelimiter);
      const secret = await this.props.passvault.getSecret(`${folder}${secretName}`);
      return (
        <PassVaultSecret
          folder={folder}
          secret={secret}
          passvault={this.props.passvault}
       />
      );
    });
    return await Promise.all(favoritesPromises);
  }

  // TODO : Type return better
  private async getFoldersList(): Promise<any> {
    const folders = await this.props.passvault.getFolders();
    const folderPromises = folders.map(async (folder) => {
      const secrets = await this.props.passvault.getSecretsFromFolder(folder);
      return (
          <li key={`${folder}-li`}>
            <div
              className="collapsible-header"
              key={`${folder}-header`}
            >
              <i className="material-icons prefix teal-text">folder</i>{folder}
            </div>
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
    return await Promise.all(folderPromises);
  }

  private async getNotes(): Promise<string> {
    return "These are my notes";
  }
}
