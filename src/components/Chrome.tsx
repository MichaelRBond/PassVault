import * as React from "react";

import './Chrome.scss';

export default class extends React.Component {
  render() {
    return (
      <nav className="chrome">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li className='settings'>
        <a href="#/settings">
          <i className="large material-icons black-text">settings</i>
        </a>
      </li>
          </ul>
        </div>
      </nav>
    );
  }
}
