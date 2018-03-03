import * as React from "react";
import {Config} from "../config";

import "./Chrome.scss";

export default class extends React.Component {
  public render() {
    return (
      <div className="chrome" style={{overflowY: "scroll"}}>
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
            <li className="settings" key="settings">
              <a href={Config.PAGE_SETTINGS}>
                <i className="large material-icons black-text">settings</i>
              </a>
            </li>
            </ul>
          </div>
        </nav>
        <div className="chrome-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
