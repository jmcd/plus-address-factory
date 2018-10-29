import './App.css';

import React, { Component } from 'react';

import CryptoRandom from './CryptoRandom';
import DicewareWords from './DicewareWords';
import PlusAddressFactory from './PlusAddressFactory';

class App extends Component {
  constructor(props) {
    super(props);

    const words = new DicewareWords(() => CryptoRandom.getRandomInt(1, 6));
    this.constructPlusAddress = (ea, url) => PlusAddressFactory.construct(ea, url, words.getRandomWord());

    this.handleRequestRefresh = this.handleRequestRefresh.bind(this);
    this.handleRequestClipboardWrite = this.handleRequestClipboardWrite.bind(this);
    this.handleChangeEmailAddress = this.handleChangeEmailAddress.bind(this);
    this.handleChangeSignupDomainOrUrl = this.handleChangeSignupDomainOrUrl.bind(this);
    
    this.state = {
      emailAddress: '',
      signupDomainOrUrl: '',
      result: '',
    };
  }

  handleRequestRefresh(e) {
    e.preventDefault();
    this.refresh();
  }

  handleRequestClipboardWrite(e) {
    e.preventDefault();
    const r = this.state.result;
    navigator.clipboard.writeText(r);
  }

  handleChangeEmailAddress(e) {
    const v = e.target.value;
    this.setState({ emailAddress: v }, this.refresh);
  }

  handleChangeSignupDomainOrUrl(e) {
    const v = e.target.value;
    this.setState({ signupDomainOrUrl: v }, this.refresh);
  }

  refresh() {
    const emailAddress = this.state.emailAddress;
    const signupDomainOrUrl = this.state.signupDomainOrUrl;
    const r = this.constructPlusAddress(emailAddress, signupDomainOrUrl);
    if (r === undefined) { return; }
    this.setState({ result: r });
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor="emailAddress" >Email Address:</label>
          <input id="emailAddress" type="text" onChange={this.handleChangeEmailAddress}></input>
          <div className="hint">john@gmail.com, john@fastmail.com, @yourdomain.co</div>
        </div>
        <div>
          <label htmlFor="signupDomainOrUrl">Signup URL:</label>
          <input id="signupDomainOrUrl" type="text" autoComplete="off" onChange={this.handleChangeSignupDomainOrUrl}></input>
          <div className="hint">example.com, https://www.example.com/signup?foo=bar</div>
        </div>
        <hr></hr>
        <div>
          <label htmlFor="result">Result:</label>
          <input id="result" type="text" value={this.state.result} readOnly></input>
          <div className="result-actions">
            <button onClick={this.handleRequestRefresh} >Refresh</button>
            <button onClick={this.handleRequestClipboardWrite} >Copy</button>
          </div>
        </div>
      </form>
    );
  }
}

export default App;



