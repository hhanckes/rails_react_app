//Profiles.js
import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap';

class SignIn extends Component {
	
	constructor(props) {
  		super(props)
  		this.state = {
    		profiles: []
  		}
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