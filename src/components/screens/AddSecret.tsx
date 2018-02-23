import * as React from "react";
import { Logger } from "../../utils/logger";
import Vault from "../../vault";
import CancelButton from "../elements/CancelButton";
import ConfirmButton from "../elements/ConfirmButton";
import TextArea from "../elements/TextArea";
import TextInput from "../elements/TextInput";

const logger = new Logger("AddSecret");

interface ComponentProps {
  vault: Vault;
}

declare var window: any;

export default class AddSecret extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    if (!props.vault) {
      window.location = "/#/start";
    }
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
          <h5>Website.com</h5>
        </div>
        <div className="col s1 left-align">
          <h5>
            <a href="test.com" className="grey-text text-darken-1">
              <i className="material-icons prefix">favorite_border</i>
            </a>
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
          placeholder="website.com"
          colSize={10}
          onChangeHandler={this.updateUsername}
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
        />
        <div className="col s1 left-align">
          <h5>
            <a href="test.com" className="grey-text text-darken-1">
              <i className="material-icons small">remove_red_eye</i>
            </a>
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
            label="Notes"
            colSize={12}
          />
        </div>
      </form>
      <div className="col s12 center-align">
        <div className="col s1 offset-s1">
          <div className="valign-wrapper">
            <h5>
              <a href="test.com" className="grey-text text-darken-1">
                <i className="material-icons small">delete</i>
              </a>
            </h5>
          </div>
        </div>
        <div className="col s5">
          {/* TODO: What do we do on a cancel event */}
          <CancelButton
            onclickHandler={undefined}
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
    return;
  }

  private updateWebsite(): void {
    //
  }

  private updateUsername(): void {
    //
  }

  private updatePassword(): void {
    //
  }

  private updateFolder(): void {
    //
  }

  private updateNotes(): void {
    //
  }
}
