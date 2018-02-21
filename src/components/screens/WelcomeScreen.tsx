import * as React from "react";

import ConfirmButton from '../elements/ConfirmButton';
import RoundButton from '../elements/RoundButton';

const logo = require('./passvaultlogo.png');

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
}

export default class extends React.Component<ComponentProps, {}> {
  handleTestConnection(e: Event) {
    if(this.props.handleTestConnection) {
      this.props.handleTestConnection(e);
    }
  }

  handleConfirm(e: Event) {
    if(this.props.handleConfirm) {
      this.props.handleConfirm(e);
    }
  }

  render() {
    return (
       <main className="mdl-layout__content mdl-color--grey-200">
        <div className="page-content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col center-text"><img src={logo} /></div>
            <div className="mdl-cell mdl-cell--12-col">
              <p className="center-text">Welcome to PassVault</p>
              <p className="center-text">Please configure the Vault server to connect to for password storage. You can return to change these settings at any point by clicking the options button in the top right corner</p>
            </div>
            <div className="mdl-cell mdl-cell--12-col center-text">
              <form action="#"> <div className="mdl-textfield mdl-js-textfield">
                  <input className="mdl-textfield__input" type="text" id="sample1" />
                  <label className="mdl-textfield__label" htmlFor="sample1">Vault URL ex. https://myvault.com:8200</label> </div> </form>
            </div>
            <div className="mdl-cell mdl-cell--12-col center-text">
              <RoundButton text={'Test Connection'} onclickHandler={(e: Event) => { this.handleTestConnection(e) }}/>
            </div>
            <div className="mdl-cell mdl-cell--12-col center-text">
              <ConfirmButton type={'large'} text={'Save'} onclickHandler={(e: Event) => { this.handleConfirm(e)}}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
