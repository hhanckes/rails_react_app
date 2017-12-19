//ProfileForm.js
import React, { Component } from 'react'
import axios from 'axios'
import ProfileAvatar from './ProfileAvatar'
import CalendarForm from './CalendarForm'
import ProfileServicesForm from './ProfileServicesForm'

class ProfileForm extends Component {
	constructor(props) {
		super(props)
		this.onClickSaveProfile = this.onClickSaveProfile.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleImageChange = this.handleImageChange.bind(this)
		this.handleAddService = this.handleAddService.bind(this)
		this.handleAddAvailability = this.handleAddAvailability.bind(this)
		
		this.state = {
			name: '',
			brief: '',
			constrains: '',
			picture: '',
			services: [],
			availabilities: []
		}
	}

	handleInput(e) {
    	this.setState({[e.target.name]: e.target.value})
  	}

  	handleImageChange(imageSrc) {
		this.setState({picture: imageSrc})
  	}

  	handleAddService() {

  	}

  	handleAddAvailability() {

  	}

	onClickSaveProfile() {
		axios.post('http://localhost:3001/api/v1/profiles', this.state)
  			.then(response => {
    			console.log(response)
  			})
  			.catch(error => console.log(error))
	}

	render() {
		return (
			<div style={{width:'70%', margin:'0 auto', fontSize:'11px'}}>
				<h1>Imagen de Perfil</h1>
				<ProfileAvatar onImageChange={this.handleImageChange}/>
				<h1>Datos</h1>
				<div>
					Nombre: <input type="text" name="name" placeholder='Enter your name' value={this.state.name} onChange={ this.handleInput } /><br />
	          		Descripción general: <textarea name="brief" placeholder='Describe yourself' value={this.state.brief} onChange={ this.handleInput } /><br />
	          		Condiciones generales: <textarea name="constrains" placeholder='Condiciones específicas como, tener estacionamiento u otro' value={this.state.constrains} onChange={ this.handleInput } />
				</div>
				<h1>Servicios Ofrecidos</h1>
					<ProfileServicesForm onAddService={this.handleAddService} />
				<h1>Disponibilidad</h1>
				<p>Estos serán los bloques de horarios en los cuales aceptaremos reservas</p>
				<div>
					<CalendarForm onAddAvailability={this.handleAddAvailability} />
				</div>
				<div>
					<button className="saveProfile" onClick={this.onClickSaveProfile}>Save Profile</button>
				</div>
			</div>
        )
	}
}

export default ProfileForm