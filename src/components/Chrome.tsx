import * as React from "react";

import "./Chrome.scss";

export default class extends React.Component {
  public render() {
    return (
      <div className="chrome" style={{"overflow-y": "scroll"}}>
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="settings">
              <a href="#/settings">
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
