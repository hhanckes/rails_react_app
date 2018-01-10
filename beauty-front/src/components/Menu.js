//menu.js
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import ProfileForm from './ProfileForm/ProfileForm';
import Services from './Services/ServiceListing';
import ProfileListing from './Profiles/ProfileListing'
import ProfileShow from './Profiles/ProfileShow'
import Home from './Home'

const Menu = () => (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Sign In (completar)</Link></li>
        <li><Link to="/services">Servicios</Link></li>
        <li><Link to="/profiles">Perfiles de proveedores</Link></li>
        <li><Link to="/profiles">Buscador proveedores (completar)</Link></li>
        <li><Link to="/edit-profile">Crear perfil de proveedor</Link></li>
        <li><Link to="/profiles">Reservas (completar)</Link></li>
      </ul>

      <hr/>

      <Switch>
        <Route exact path='/' component={ Home }/>
        <Route path="/edit-profile" component={ ProfileForm }/>
        <Route path="/services" component={ Services } />
        <Route path='/profiles/service/:id' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles/service' /> ) } />
        <Route path='/profiles/service_category/:id' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles/service_category' /> ) } />
        <Route path='/profiles/:profile_id' component={ ProfileShow }/>
        <Route path='/profiles' render={ (routeProps) => ( <ProfileListing {...routeProps} fetch_url='http://localhost:3001/api/v1/profiles' /> ) } />
      </Switch>
    </div>
)

export default Menu;