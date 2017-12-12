//ProfileServicesForm.js
import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'; //https://react-responsive-modal.leopradel.com/
import ServiceDetailForm from './ServiceDetailForm'

class ProfileServicesForm extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleAddService = this.handleAddService.bind(this)
		this.state = {
    		selectedServicesId: [1, 2, 3],
    		openModal: false,
    		services: []
  		}
	}

	openModal = () => {
		this.setState({ openModal: true });
	};

	onCloseModal = () => {
		this.setState({ openModal: false });
	};

	componentDidMount() {
  		axios.get('http://localhost:3001/api/v1/service_categories')
  		.then(response => {
   			console.log(response)
   			this.setState({services: response.data})
  		})
  		.catch(error => {
  			console.log(error)
  		})
	}

	handleAddService() {

	}

	handleClick(serviceName, id) {
		this.openModal();
	}

	render() {
		let services = this.state.services.map((serviceCategory) => {
			return(
					<div>
						<h3>{ serviceCategory.name }</h3>
						<ul>
							{ 	serviceCategory.services.map((service) => {
									return(<li key={ service.id }>{ service.name }</li>)
								})
							}
						</ul>
					</div>
				)
	     	});

		return (
			<div>
	    	    <Modal open={this.state.openModal} onClose={this.onCloseModal} little>
					<ServiceDetailForm />
	        	</Modal>
	        	{ services }
			</div>
		)
	}
}

export default ProfileServicesForm