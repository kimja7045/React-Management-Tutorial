import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// 웹사이트의 화면에 대한 내용 출력 담당

class App extends Component {
  render() {
    return (
      <div className="gray-background">
        <img src={logo} alt="logo"/>
        <h2>Let's develop management system!</h2>
      </div>
    );
  }
}

export default App;
