import * as React from "react";
import { buildUrlFromStr, getPrettyUrl } from "../../utils/helpers";
import Vault from "../../vault";
import MenuList from "../elements/MenuList";
import PassVaultIcon from "../elements/PassVaultIcon";
import SearchBox from "../elements/SearchBox";

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
  vault: Vault;
}

interface ComponentState {
  favorites: any;
  notes: string;
  folders: any;
}

export default class extends React.Component<ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      favorites: "Loading ...",
      notes: "Loading ...",
      folders: "Loading ...",
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
            content: this.state.folders,
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
      </div>
    );
  }

  // TODO : Type return better
  private async getFavorites(): Promise<any> {
    const favorites = await this.props.vault.getFavorites();
    return favorites.map((f) => {
      const prettyUrl = getPrettyUrl(f);
      const url = buildUrlFromStr(f);
      return (
        <div className="row">
          <div className="col s1 left-align">
           <a href="test.com" className="grey-text">
          <i className="material-icons prefix">personal_video</i>
          </a>
          </div>
          <div className="col s6 offset-s1 left-align">
            <a href={url}>{prettyUrl}</a>
          </div>
          <div className="col s1 center-align">
              <a href="#" className="grey-text">
                  <i className="material-icons prefix">person</i>
              </a>
          </div>
          <div className="col s1 center-align">
              <a href="#" className="grey-text">
                  <i className="material-icons prefix">lock</i>
              </a>
          </div>
          <div className="col s1 center-align">
              <a href="#" className="grey-text">
                  <i className="material-icons prefix">mode_edit</i>
              </a>
          </div>
        </div>
        );
      });
    }

  // TODO : Type return better
  private async getFolders(): Promise<any> {
    const folders = await this.props.vault.getFolders();
    const folderPromises = folders.map(async (f) => {
      const websites = await this.props.vault.list(`${Vault.FOLDERS}/${f}`);
      return (
        <div>
          {f}
          <ul>
            {
              websites.map((w) => {
                const prettyUrl = getPrettyUrl(w);
                const url = buildUrlFromStr(w);
                return (<li>
                  <a href={url}>{prettyUrl}</a>
                  <PassVaultIcon
                    type="user"
                    folder={f}
                    secret={w}
                    vault={this.props.vault}
                  />
                  <PassVaultIcon
                    type="password"
                    folder={f}
                    secret={w}
                    vault={this.props.vault}
                  />
                  <PassVaultIcon
                    type="edit"
                    folder={f}
                    secret={w}
                    vault={this.props.vault}
                  />
                </li>);
              })
            }
          </ul>
        </div>
      );
    });
    const ret = await Promise.all(folderPromises);
    return ret;
  }

  private async getNotes(): Promise<string> {
    return "These are my notes";
  }
}
