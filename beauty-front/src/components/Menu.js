//menu.js
import ProfileForm from './ProfileForm/ProfileForm';
import Profile from './Profile';
import Profiles from './Profiles';
import Home from './Home';

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/edit-profile">Agregar Perfil</Link></li>
        <li><Link to="/profiles">Perfiles</Link></li>
        <li><Link to="/profile">Perfil Particular</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/edit-profile" component={ProfileForm}/>
      <Route path="/profiles" component={Profiles}/>
      <Route path="/profile" component={Profile}/>
    </div>
  </Router>
)

export default BasicExample;
