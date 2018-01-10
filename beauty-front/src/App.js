//https://www.sitepoint.com/react-rails-5-1/

import React, { Component } from 'react';
import Helmet from "react-helmet";
import Menu from './components/Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        </Helmet>
        <div className="App" id="app">
          <header className="App-header">
            <h1 className="App-title">Beauty Everywhere</h1>
          </header>
          <Menu />
        </div>
      </div>
    );
  }
}

export default App;
