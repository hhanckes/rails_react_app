//Profiles.js
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Profiles extends Component {

	constructor(props) {
  		super(props)
  		this.state = {
    		profiles: []
  		}
  	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.fetch_url !== this.props.fetch_url) {
		  	const id = nextProps.match.params.id === undefined ? '' : `/${nextProps.match.params.id}`
			const fetch_url = nextProps.fetch_url+id
	  	  	
	  	  	axios.get(fetch_url)
		  		.then(response => {
		   			this.setState({profiles: response.data})
		  		})
		  		.catch(error => {
		  			console.log(error)
		  		})
		}
	}

	componentDidMount() {
	  	const id = this.props.match.params.id === undefined ? '' : `/${this.props.match.params.id}`
		const fetch_url = this.props.fetch_url+id
		
	  	axios.get(fetch_url)
	  		.then(response => {
	   			this.setState({profiles: response.data})
	  		})
	  		.catch(error => {
	  			console.log(error)
	  		})
	}

	render() {
		let profiles = this.state.profiles.map((profile) => {
				return (
					<div style={{borderBottom:'1px solid grey', padding:'10px'}} key={ profile.name+profile.id } >
						<p><img alt={ profile.name } src={"http://localhost:3001"+profile.picture.url} /></p>
						<p><Link to={`${this.props.match.url}/${profile.id}`}>Nombre: { profile.name }</Link></p>
						<p>Brief: {profile.brief}</p>
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