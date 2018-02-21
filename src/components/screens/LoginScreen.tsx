import * as React from "react";

const logo = require('./passvaultlogo.png');

interface ComponentProps {
  handleTestConnection?: any;
  handleConfirm?: any;
}

interface ComponentState {
  url: string
}

export default class LoginScreen extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      url: ""
    };

    this.updateUrl = this.updateUrl.bind(this);
  }

  handleTestConnection(e: Event) {
    if(this.props.handleTestConnection) {
      this.props.handleTestConnection(e);
    }
  }

  handleConfirm(e: Event) {
    if(this.props.handleConfirm) {
      this.props.handleConfirm(this.state.url);
    }
  }

  updateUrl(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      url: (e.currentTarget as any).value,
    });
  }

  render() {
    return (
       <main>
        <div className="page-content">
          <div>
            <div className="center-text">
              <img src={logo} />
            </div>     
            <div className="row">
                <div className="col s12">
                    <div className="input-field col s12 center-align">
                        <select>
                            <option value="" disabled selected>Select your auth type</option>
                            <option value="1">Userpass</option>
                            <option value="1">Otka</option>
                            <option value="2">Github</option>
                            <option value="3">Token</option>
                        </select>
                    </div>
                </div>
                <div className="col s12 center-align pad-top-20">
                    <div className="input-field col s12">
                        <input placeholder="Username" id="username" type="text" className="validate"/>
                    </div>
                </div>
                <div className="col s12 center-align">
                    <div className="input-field col s12">
                        <input placeholder="Password" id="first_name" type="password" className="validate"/>
                    </div>
                    <div className="col s12 center-align">
                        <input type="checkbox" className="filled-in" id="filled-in-box" checked={true}/>
                        <label htmlFor="filled-in-box">Remember User?</label>
                        <input type="checkbox" className="filled-in" id="filled-in-box2"/>
                        <label htmlFor="filled-in-box2">Remember Password?</label>
                    </div>
                    <div className="col s12 center-align pad-top-50">
                        <a className="waves-effect waves-light btn big-button">Login</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
