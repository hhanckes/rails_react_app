//menu.js
import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import ProfileForm from './ProfileForm/ProfileForm';
import Services from './Services/ServiceListing';
import ProfileListing from './Profiles/ProfileListing'
import ProfileShow from './Profiles/ProfileShow'
import Register from './Auth/Register'
import SignIn from './Auth/SignIn'
import Home from './Home'

const Menu = () => (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/services">Servicios</Link></li>
        <li><Link to="/profiles">Perfiles de proveedores</Link></li>
        <li><Link to="/">Buscador proveedores (completar)</Link></li>
        <li><Link to="/edit-profile">Crear perfil de proveedor</Link></li>
        <li><Link to="/">Reservas (completar)</Link></li>
      </ul>

      <hr/>

      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path="/edit-profile" component={ ProfileForm } />
        <Route path="/services" component={ Services } />
        <Route path="/register" component={ Register } />
        <Route path="/signin" component={ SignIn } />
        <Route exact path='/profiles' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles' /> ) } />
        <Route exact path='/profiles/service/:id' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles/service' /> ) } />
        <Route exact path='/profiles/service_category/:id' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles/service_category' /> ) } />
        <Route exact path='/profiles/:profile_id' component={ ProfileShow } />
        <Redirect to="/" />
      </Switch>
    </div>
)

export default Menu;