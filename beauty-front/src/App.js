//https://www.sitepoint.com/react-rails-5-1/

import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './components/ProfileForm/IdeasContainer'
import ProfileForm from './components/ProfileForm/ProfileForm'

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <header className="App-header">
          <h1 className="App-title">Idea Board</h1>
        </header>
        <ProfileForm />
      </div>
    );
  }
}

export default App;
