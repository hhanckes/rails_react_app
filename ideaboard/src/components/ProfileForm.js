//ProfileForm.js
import React, { Component } from 'react'
import axios from 'axios'
import IdeaImageAvatar from './IdeaImageAvatar'

class ProfileForm extends Component {
	constructor(props) {
		super(props)
		this.onClickSaveProfile = this.onClickSaveProfile.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleImageChange = this.handleImageChange.bind(this)
		
		
		this.state = {
			name: '',
			brief: '',
			picture: ''
		}
	}

	handleInput(e) {
    	this.setState({[e.target.name]: e.target.value})
  	}

  	handleImageChange(imageSrc) {
		this.setState({picture: imageSrc})
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
			<div>
				<IdeaImageAvatar onImageChange={this.handleImageChange}/>
				<div>
					<input type="text" name="name" placeholder='Enter your name' value={this.state.name} onChange={ this.handleInput } /><br />
          			<textarea name="brief" placeholder='Describe yourself' value={this.state.brief} onChange={ this.handleInput } />
					<button className="saveProfile" onClick={this.onClickSaveProfile}>Save Profile</button>
				</div>
			</div>
        )
	}
}

export default ProfileForm