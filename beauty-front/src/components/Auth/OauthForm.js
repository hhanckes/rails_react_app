//Profiles.js
import React, { Component } from 'react'
import Auth from 'j-toker'
import { Button, ButtonGroup } from 'react-bootstrap';

Auth.configure({
  apiUrl: 'http://localhost:3001/api/v1'
});

class OauthForm extends Component {
	
	constructor(props) {
  		super(props)
  		this.state = {
    		email: '',
      		password: '',
      		errors: null
  		}
  		this.handleAuthClick = this.handleAuthClick.bind(this)
  	}

  	handleAuthClick(e) {
  		var provider = e.target.dataset.provider;
  		Auth.oAuthSignIn({
			provider: provider,
      		config: this.props.config,
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
			<ButtonGroup>
				<Button onClick={this.handleAuthClick}
				      disabled={this.props.signedIn}
				      bsStyle='primary'
				      data-provider='facebook'>
				Facebook
				</Button>

				<Button onClick={this.handleAuthClick}
				      disabled={this.props.signedIn}
				      bsStyle='warning'
				      data-provider='google'>
				Google
				</Button>
			</ButtonGroup>
	    )
	}
}

export default OauthForm