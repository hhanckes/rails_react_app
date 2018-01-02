//Profiles.js
import React, { Component } from 'react'
import axios from 'axios'

class Profiles extends Component {

	constructor(props) {
  		super(props)
  		this.state = {
    		profiles: []
  		}
  	}

  componentDidMount() {
  	axios.get('http://localhost:3001/api/v1/profiles')
  		.then(response => {
   			console.log(response)
   			this.setState({profiles: response.data})
  		})
  		.catch(error => {
  			console.log(error)
  		})
	}

	render() {
		let profiles = this.state.profiles.map((profile) => {
				return (
					<div style={{borderBottom:'1px solid grey', padding:'10px'}}>
						<p><img src={"http://localhost:3001"+profile.picture.url} /> { profile.name }</p>
						<p>Brief: {profile.brief}</p>
						<p>Restrictions: </p>
						<p>Services:</p>
						<ul>
							{
								profile.service_details.map((service_detail) => {
									return (
										<li>{ service_detail.service ? service_detail.service.name : '' } : Precio { service_detail.price } + Tiempo { service_detail.time }</li>
									)
								})
							}
						</ul>
						<p>Availabilities: </p>

					</div>
				)
			});

	    return (
	    	<div>
	    		{ profiles }
	    	</div>
	    )
	}
}

export default Profiles