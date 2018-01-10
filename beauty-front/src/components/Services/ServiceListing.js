//Profiles.js
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Services extends Component {

	constructor(props) {
  		super(props)
  		this.state = {
    		services: []
  		}
  	}

  componentDidMount() {
  	axios.get('http://localhost:3001/api/v1/service_categories')
  		.then(response => {
   			this.setState({services: response.data})
  		})
  		.catch(error => {
  			console.log(error)
  		})
	}

	render() {
		let services = this.state.services.map((service_category) => {
				return (
					<div key={service_category.name} style={{borderBottom:'1px solid grey', padding:'10px'}}>
						<p><Link to={`profiles/service_category/${service_category.id}`}>{ service_category.name }</Link></p>
						<ul>
						{
							service_category.services.map((service) => {
								return (
									<li key={service.name}>
										<Link to={`profiles/service/${service.id}`}>{ service.name }</Link>
									</li>
								)
								
							})
						}
						</ul>
					</div>
				)
			});

	    return (
	    	<div>
	    		{ services }
	    	</div>
	    )
	}
}

export default Services