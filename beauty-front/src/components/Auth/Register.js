//Profiles.js
import React, { Component } from 'react'
import Auth from 'j-toker'
import { Panel, Button } from 'react-bootstrap';

Auth.configure({
  apiUrl: 'http://localhost:3001/api/v1'
});

class Register extends Component {
	
	constructor(props) {
  		super(props)
  		this.state = {
			email: '',
			password: '',
			password_confirmation: '',
			sent_email: '',
			errors: null
  		}
  		this.handleInputChange = this.handleInputChange.bind(this)
  		this.handleRegistrationClick = this.handleRegistrationClick.bind(this)
  	}

  	handleInputChange(e) {
    	this.setState({[e.target.name]: e.target.value})
  	}

  	handleRegistrationClick() {
  		Auth.emailSignUp({
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.password_confirmation,
			favorite_color: this.state.favorite_color,
			config: this.props.config
    	})
    	.then((res) => {
    		console.log(res)
			alert('All Good')
		})
		.fail((e) => {
			console.log(e)
			alert('Error')
		})
  	}

	render() {
	    return (
		<Panel header='Register by Email' bsStyle='info'>
	        <form>
	          <input type='email'
	                name='email'
	                label='Email'
	                placeholder='Enter email...'
	                value={this.state.email}
	                onChange={this.handleInputChange} />
	          <br />
	          <input type='password'
	                name='password'
	                label='Password'
	                placeholder='Enter password...'
	                value={this.state.password}
	                onChange={this.handleInputChange} />
	          <br />
	          <input type='password'
	                name='password_confirmation'
	                label='Password Confirmation'
	                placeholder='Enter password again...'
	                value={this.state.password_confirmation}
	                onChange={this.handleInputChange} />
	          <br />
	          <Button className='btn btn-primary'
	                  onClick={this.handleRegistrationClick}>
	            Register
	          </Button>
	        </form>
        </Panel>
	    )
	}
}

export default Register