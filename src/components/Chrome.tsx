import * as React from "react";

import './Chrome.scss';

export default class extends React.Component {
  render() {
    return (
      <div className="chrome mdl-layout mdl-js-layout  mdl-color--grey-200">
        <header className="mdl-layout__header mdl-layout__header--transparent">
          <div className="mdl-layout__header-row">
            {/* Title */}

            {/* Add spacer, to align navigation to the right */}
            <div className="mdl-layout-spacer" />
            {/* Navigation */}
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href='#'>
                <i className="material-icons md-48">settings</i>
              </a>
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content">
          {this.props.children}
        </main>
      </div>
    );
  }
}
