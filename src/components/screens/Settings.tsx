import * as React from "react";
import {Config} from "../../config";
import { PassVaultModel } from "../../models/passvault";
import {changeWindowLocation} from "../../utils/browser";
import CancelButton from "../elements/CancelButton";
import ConfirmButton from "../elements/ConfirmButton";

interface ComponentProps {
  passvault: PassVaultModel;
}

export default class Settings extends React.Component<ComponentProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <main>
        <div className="page-content">
          <div className="row">
            <div className="col center-align pad-top-50">
              <div className="col s5">
                {/* TODO: What do we do on a cancel event */}
                <CancelButton
                  onclickHandler={() => { changeWindowLocation(Config.PAGE_MAIN); }}
                />
              </div>
              <div className="col s5">
                <ConfirmButton
                  text={`Logout`}
                  onclickHandler={() => this.props.passvault.logout()}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

}
