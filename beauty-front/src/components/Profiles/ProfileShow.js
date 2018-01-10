//Profiles.js
import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {

	constructor(props) {
  		super(props)
  		this.state = {
  			data: []
  		}
  	}

  componentDidMount() {
  	axios.get(`http://localhost:3001/api/v1/profiles/${ this.props.match.params.profile_id }`)
  		.then(response => {
   			console.log(response)
   			this.setState({data: response.data})
  		})
  		.catch(error => {
  			console.log(error)
  		})
	}

	render() {
	    return (
	    	<div>
	    		{ this.state.data.name }
	    	</div>
	    )
	}
}

export default Profile