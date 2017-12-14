//https://www.sitepoint.com/react-rails-5-1/

import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './components/ProfileForm/IdeasContainer'
import ProfileForm from './components/ProfileForm/ProfileForm'
import Helmet from "react-helmet";

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
            <h1 className="App-title">Idea Board</h1>
          </header>
          <ProfileForm />
        </div>
      </div>
    );
  }
}

export default App;
