import * as QueryString from "query-string";
import * as React from "react";
import { Config } from "../../config";
import { PassVaultModel, Secret } from "../../models/passvault";
import { changeWindowLocation, copyToClipboardFromId, getLocationHash, openInputTextInNewTab } from "../../utils/browser";
import { getElementById } from "../../utils/browser";
import { isBlank } from "../../utils/helpers";
import { Logger } from "../../utils/logger";
import { buildFavoritesPath } from "../../utils/passvault";
import CancelButton from "../elements/CancelButton";
import ConfirmButton from "../elements/ConfirmButton";
import TextArea from "../elements/TextArea";
import TextInput from "../elements/TextInput";
import Hidden from "../Hidden";

const logger = new Logger("AddSecret");

interface ComponentProps {
  passvault: PassVaultModel;
}

interface ComponentState {
  name: string;
  website: string;
  username: string;
  password: string;
  folder: string;
  notes: string;
  favorite: boolean;
  togglePassword: string;
  editor: boolean;
  modified: boolean;
}

export default class AddSecret extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    if (!props.passvault) {
      changeWindowLocation(Config.PAGE_START);
    }

    this.state = {
      name: "",
      website: "",
      username: "",
      password: "",
      folder: "",
      notes: "",
      favorite: false,
      togglePassword: "password",
      editor: false,
      modified: false,
    };

    this.saveSecret = this.saveSecret.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.deleteSecret = this.deleteSecret.bind(this);
    this.favoriteSecret = this.favoriteSecret.bind(this);
  }

  public async componentDidMount() {
    const locationHash = getLocationHash();
    const secretName = QueryString.parse(locationHash).secret;
    const folder = QueryString.parse(locationHash).folder;

    if (isBlank(secretName) || isBlank(folder)) {
      return;
    }

    const [password, favorite] = await Promise.all([
      this.props.passvault.getSecret(`${folder}/${secretName}`),
      this.props.passvault.secretIsFavorite(folder, secretName),
    ]);
    // TODO : check to make sure that we a password back
    this.setState({
      ...this.state,
      name: password.name,
      website: password.url,
      username: password.username,
      password: password.password,
      folder,
      notes: password.notes,
      favorite,
      editor: true,
    });

  }

  public render() {
    return (
      <main>
        <div className="page-content">
          <div className="row">
            <div className="col s12">
              <TextInput
                id="website-name"
                label=""
                active={true}
                validate={true}
                placeholder="Website.Com"
                colSize={10}
                onChangeHandler={this.updateName}
                value={this.state.name}
                tabIndex={1}
              />
              <div className="col s1">
                <Hidden when={!this.state.editor}>
                  <a className="btn-floating waves-effect waves-light btn-small">
                    <i className="material-icons prefix" onClick={this.favoriteSecret}>
                      {this.state.favorite ? "favorite" : "favorite_border"}
                    </i>
                  </a>
                </Hidden>
              </div>
            </div>
            <div className="col s12">
              <TextInput
                id="website"
                label=""
                active={true}
                validate={true}
                placeholder="website.com"
                colSize={10}
                onChangeHandler={this.updateWebsite}
                value={this.state.website}
                tabIndex={2}
              />
              <div className="col s1 min-40">
                <a className="btn-floating waves-effect waves-light btn-small">
                  <i className="material-icons" title="Open Website" onClick={() => {
                    openInputTextInNewTab("website");
                  }}>open_in_new</i>
                </a>
              </div>
            </div>
            <div className="col s12">
              <TextInput
                id="username"
                label=""
                active={true}
                validate={true}
                placeholder="username"
                colSize={10}
                onChangeHandler={this.updateUsername}
                value={this.state.username}
                tabIndex={3}
              />
              <div className="col s1 min-40">
                <a className="btn-floating waves-effect waves-light btn-small">
                  <i className="material-icons" title="Copy Password" onClick={() => {
                    copyToClipboardFromId("username");
                  }}>content_copy</i>
                </a>
              </div>
            </div>
            <div className="col s12">
              <TextInput
                id="password"
                type="password"
                label=""
                active={true}
                validate={true}
                placeholder="****************"
                colSize={9}
                onChangeHandler={this.updatePassword}
                value={this.state.password}
                tabIndex={4}
              />
              <div className="col s1 min-40">
                <a className="btn-floating waves-effect waves-light btn-small">
                  <i className="material-icons" title="Show/Hide Password" onClick={this.togglePassword}>remove_red_eye</i>
                </a>
              </div>
              <div className="col s1 min-40">
                <a className="btn-floating waves-effect waves-light btn-small">
                  <i className="material-icons" title="Copy Password" onClick={() => {
                    copyToClipboardFromId("password");
                  }}>content_copy</i>
                </a>
              </div>
            </div>
            <div className="col s12">
              <TextInput
                id="folder"
                label=""
                active={true}
                validate={true}
                placeholder="folder-name"
                colSize={10}
                onChangeHandler={this.updateFolder}
                value={this.state.folder}
                tabIndex={5}
              />
              {/* TODO : This should be a select box instead of the free text field above */}
              {/* <select>
          <option value="" disabled selected>Select Folder</option>
          <option value="1">Default</option>
          <option value="2">Business</option>
          <option value="3">Entertainment</option>
          <option value="4" data-icon="plus-circle-outline.png" className="left">Add new....</option>
        </select> */}
              <div className="col s1 min-40">
                <a className="btn-floating waves-effect waves-light btn-small">
                  <i className="material-icons small">folder</i>
                </a>
              </div>
            </div>
            <form className="col s12">
              <div className="row">
                <TextArea
                  id="notes"
                  onChangeHandler={this.updateNotes}
                  value={this.state.notes}
                  label="Notes"
                  colSize={12}
                />
              </div>
            </form>
            <div className="col s12 center-align">
              <div className="col s2">
                <div className="valign-wrapper">
                  <Hidden when={!this.state.editor}>
                    <a className="btn-floating waves-effect waves-light">
                      <i className="material-icons" title="Delete Secret" onClick={this.deleteSecret}>delete</i>
                    </a>
                  </Hidden>
                </div>
              </div>
              <div className="col s5">
                {/* TODO: What do we do on a cancel event */}
                <CancelButton
                  onclickHandler={() => { changeWindowLocation(Config.PAGE_MAIN); }}
                />
              </div>
              <div className="col s5">
                <ConfirmButton
                  text="Save"
                  onclickHandler={this.saveSecret}
                  disable={!this.state.modified}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  private async saveSecret(): Promise<void> {
    logger.info("saving secret to vault ...");
    const secret: Secret = {
      name: this.state.name,
      url: this.state.website,
      username: this.state.username,
      password: this.state.password,
      notes: this.state.notes,
    };
    await this.props.passvault.saveSecret(secret, this.state.folder);
    changeWindowLocation(Config.PAGE_MAIN);
    return;
  }

  // TODO : These updates can be refactored to a single method
  private updateName(event: any): void {
    this.setState({
      ...this.state,
      name: event.currentTarget.value,
      modified: true,
    });
  }

  private updateWebsite(event: any): void {
    this.setState({
      ...this.state,
      website: event.currentTarget.value,
      modified: true,
    });
  }

  private updateUsername(event: any): void {
    this.setState({
      ...this.state,
      username: event.currentTarget.value,
      modified: true,
    });
  }

  private updatePassword(event: any): void {
    this.setState({
      ...this.state,
      password: event.currentTarget.value,
      modified: true,
    });
  }

  private updateFolder(event: any): void {
    this.setState({
      ...this.state,
      folder: event.currentTarget.value,
      modified: true,
    });
  }

  private updateNotes(event: any): void {
    this.setState({
      ...this.state,
      notes: event.currentTarget.value,
      modified: true,
    });
  }

  private togglePassword(): void {
    const togglePassword = this.state.togglePassword === "password" ? "text" : "password";
    this.setState({
      ...this.state,
      togglePassword,
    });
    const passwordInput = getElementById("password");
    passwordInput.type = togglePassword;
  }

  private async deleteSecret(): Promise<void> {
    if (this.state.modified) {
      return;
    }
    await this.props.passvault.deletePassword(this.state.name, this.state.folder);
    changeWindowLocation(Config.PAGE_MAIN);
    return;
  }

  private async favoriteSecret(): Promise<void> {
    if (this.state.modified) {
      return;
    }
    const favorites = await this.props.passvault.getFavorites();
    return this.state.favorite ? this.removeFavorite(favorites) : this.addFavorite(favorites);
  }

  private async removeFavorite(favorites: string[]): Promise<void> {
    this.setState({
      ...this.state,
      favorite: false,
    });

    const index = favorites.indexOf(buildFavoritesPath(this.state.folder, this.state.name));
    if (index !== -1) {
      favorites.splice(index, 1);
    }
    await this.props.passvault.saveFavorites(favorites.join(","));
    return;
  }

  private async addFavorite(favorites: string[]): Promise<void> {
    this.setState({
      ...this.state,
      favorite: true,
    });

    const newFavorite = buildFavoritesPath(this.state.folder, this.state.name);
    favorites.push(newFavorite);
    await this.props.passvault.saveFavorites(favorites.join(","));
    return;
  }
}
