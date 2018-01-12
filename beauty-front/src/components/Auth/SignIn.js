//Profiles.js
import React, { Component } from 'react'
import Auth from 'j-toker'
import { Panel, Button } from 'react-bootstrap';

Auth.configure({
  apiUrl: 'http://localhost:3001/api/v1'
});

class SignIn extends Component {
	
	constructor(props) {
  		super(props)
  		this.state = {
    		email: '',
      		password: '',
      		errors: null
  		}
  		this.handleInputChange = this.handleInputChange.bind(this)
  		this.handleSignInClick = this.handleSignInClick.bind(this)
  	}

  	handleInputChange(e) {
	    	this.setState({[e.target.name]: e.target.value})
	  	};

  	handleSignInClick() {
  		Auth.emailSignIn({
			email: this.state.email,
			password: this.state.password,
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
	    	<Panel header='Email Sign In' bsStyle='info'>
		        <form>
		          <input type='email'
		                name='email'
		                label='Email'
		                placeholder='Enter email...'
		                disabled={this.props.signedIn}
		                value={this.state.email}
		                onChange={this.handleInputChange} />

		          <input type='password'
		                name='password'
		                label='Password'
		                placeholder='Enter password...'
		                disabled={this.props.signedIn}
		                value={this.state.password}
		                onChange={this.handleInputChange} />

		          <Button className='btn btn-primary'
		                  onClick={this.handleSignInClick}
		                  disabled={this.props.signedIn}>
		            Sign In
		          </Button>
		        </form>
		      </Panel>
	    )
	}
}

export default SignIn