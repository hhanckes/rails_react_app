//Profiles.js
import React, { Component } from 'react'
import {Router, Redirect} from 'react-router'
import Auth from 'j-toker'
import { Panel, Button } from 'react-bootstrap';
import OauthForm from './OauthForm'

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
  		this.renderErrorMessage = this.renderErrorMessage.bind(this)
  	}

  	componentDidMount() {
	    Auth.validateToken()
			.then(function(user) {
				console.log(user.email)
		        this.setState({
		          email: user.email
		        })
	      	})
	      	.fail(function() {
	      		console.log('fail')
	      	})
  	}

  	handleInputChange(e) {
	    	this.setState({[e.target.name]: e.target.value})
	  	};

  	handleRegistrationClick() {
  		Auth.emailSignUp({
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.password_confirmation,
			favorite_color: this.state.favorite_color,
			config: this.props.config
    	})
    	.then((res) => {
			alert('All Good')
		})
		.fail((res) => {
			this.setState({
          		errors: res.data.errors
        	})
		})
  	}

	renderSuccessMessage() {
	    return (
	      <p>Welcome {Auth.user.email}!</p>
	    );
	}

	renderErrorMessage() {
		return (
			<p>There was an error: {this.state.errors.full_messages.join(', ')}</p>
		);
	}

	render() {
	    return (
	    	<div>
	    		{ this.state.email }
	    		{ this.state.errors === null ? '' : this.renderErrorMessage() }
			    <OauthForm />
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
		    </div>
	    )
	}
}

export default Register