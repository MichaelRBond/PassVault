import * as QueryString from "query-string";
import * as React from "react";
import {isBlank} from "../../utils/helpers";
import { Logger } from "../../utils/logger";
import Vault, {Password} from "../../vault";
import CancelButton from "../elements/CancelButton";
import ConfirmButton from "../elements/ConfirmButton";
import TextArea from "../elements/TextArea";
import TextInput from "../elements/TextInput";
import Hidden from "../Hidden";

declare var document: any;
declare var window: any;

const logger = new Logger("AddSecret");

interface ComponentProps {
  vault: Vault;
}

interface ComponentState {
  name: string;
  website: string;
  username: string;
  password: string;
  folder: string;
  notes: string;
  togglePassword: string;
  editor: boolean;
  modified: boolean;
}

declare var window: any;

export default class AddSecret extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    if (!props.vault) {
      window.location = "/#/start";
    }

    this.state = {
      name: "",
      website: "",
      username: "",
      password: "",
      folder: "",
      notes: "",
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
  }

  public async componentDidMount() {
    const secret = QueryString.parse(window.location.hash).secret;
    const folder = QueryString.parse(window.location.hash).folder;

    if (isBlank(secret) || isBlank(folder)) {
      return;
    }

    const password = await this.props.vault.getPassword(`${folder}/${secret}`);
    // TODO : check to make sure that we a password back
    this.setState({
      ...this.state,
      name: password.name,
      website: password.url,
      username: password.username,
      password: password.password,
      folder,
      notes: password.notes,
      editor: true,
    });

  }

  public render() {
    return (
      <main>
        <div className="page-content">
        <div className="row">
      <div className="col s12">
        <div className="col s2 center-align">
          <h5>
            <a href="test.com" className="grey-text">
              <i className="material-icons prefix">panorama_fish_eye</i>
            </a>
          </h5>
        </div>
        <div className="col s9 left-align">
          <h5>
            <TextInput
              id="website-name"
              label=""
              active={true}
              validate={true}
              placeholder="Website.Com"
              colSize={12}
              onChangeHandler={this.updateName}
              value={this.state.name}
            />
          </h5>
        </div>
        <div className="col s1 left-align">
          <h5>
            <Hidden when={!this.state.editor}>
              <a href="test.com" className="grey-text text-darken-1">
                <i className="material-icons prefix">favorite_border</i>
              </a>
            </Hidden>
          </h5>
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
        />
        <div className="col s1 left-align">
          <h5>
            <a href="test.com" className="grey-text text-darken-1">
              <i className="material-icons small">open_in_new</i>
            </a>
          </h5>
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
        />
        <div className="col s1 left-align">
          <h5>
            <a href="test.com" className="grey-text text-darken-1">
              <i className="material-icons small">content_copy</i>
            </a>
          </h5>
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
        />
        <div className="col s1 left-align">
          <h5>
            <i className="material-icons small" onClick={this.togglePassword}>remove_red_eye</i>
          </h5>
        </div>
        <div className="col s1 left-align">
          <h5>
            <a href="test.com" className="grey-text text-darken-1">
              <i className="material-icons small">content_copy</i>
            </a>
          </h5>
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
        />
        {/* TODO : This should be a select box instead of the free text field above */}
        {/* <select>
          <option value="" disabled selected>Select Folder</option>
          <option value="1">Default</option>
          <option value="2">Business</option>
          <option value="3">Entertainment</option>
          <option value="4" data-icon="plus-circle-outline.png" className="left">Add new....</option>
        </select> */}
        <div className="col s1">
          <h5>
            <i className="material-icons small">folder</i>
          </h5>
        </div>
      </div>
      <form className="col s11 offset-s1">
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
        <div className="col s1 offset-s1">
          <div className="valign-wrapper">
            <h5>
              <Hidden when={!this.state.editor}>
                <i className="material-icons small" onClick={this.deleteSecret}>delete</i>
              </Hidden>
            </h5>
          </div>
        </div>
        <div className="col s5">
          {/* TODO: What do we do on a cancel event */}
          <CancelButton
            onclickHandler={() => {window.location = "#/main"; }}
          />
        </div>
        <div className="col s5">
          <ConfirmButton
            text="Save"
            onclickHandler={this.saveSecret}
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
    const secret: Password = {
      name: this.state.name,
      url: this.state.website,
      username: this.state.username,
      password: this.state.password,
      notes: this.state.notes,
    };
    await this.props.vault.savePassword(secret, this.state.folder);
    window.location = "#/main";
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
    const passwordInput = document.getElementById("password");
    passwordInput.type = togglePassword;
  }

  private async deleteSecret(): Promise<void> {
    if (this.state.modified) {
      return;
    }
    await this.props.vault.deletePassword(this.state.name, this.state.folder);
    window.location = "#/main";
    return;
  }
}
