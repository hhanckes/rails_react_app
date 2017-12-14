//ProfileServicesForm.js
import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'; //https://react-responsive-modal.leopradel.com/
import ServiceDetailForm from './ServiceDetailForm'
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper

class ProfileServicesForm extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleAddService = this.handleAddService.bind(this)
		this.state = {
    		selectedServicesId: [],
    		openModalId: 0,
    		services: []
  		}
	}

	openModal = (id) => {
		this.setState({ openModalId: id });
	};

	onCloseModal = () => {
		this.setState({ openModalId: 0 });
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

	handleAddService(serviceId) {
		if(!this.state.selectedServicesId.includes(serviceId)) {
	    	let selectedServicesId = update(this.state.selectedServicesId, {
      				$splice: [[0, 0, serviceId]] //splice() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    			})
	    	this.setState({
	    			openModalId: 0,
    				selectedServicesId: selectedServicesId
    			})
		}
		this.setState({
    				openModalId: 0
    			})
	}

	handleClick(serviceName, id) {
		this.openModal(id);
	}

	render() {
		let services = this.state.services.map((serviceCategory) => {
			return(
					<div key={`Div${serviceCategory.id}`} >
						<h3 key={ serviceCategory.id }>{ serviceCategory.name }</h3>
						<ul key={`Ul${serviceCategory.id}`}>
							{ 	serviceCategory.services.map((service) => {
									return(
										<li key={ service.id } onClick={ () => this.handleClick(service.name, service.id) }>
											{ this.state.selectedServicesId.includes(service.id) ?  '--> '+service.name : service.name }
								    	    <Modal key={`Modal${service.id}`} open={this.state.openModalId === service.id} onClose={this.onCloseModal} closeOnOverlayClick={ false } little>
												<ServiceDetailForm key={ service.name } serviceId={service.id} serviceName={ service.name } onSaveService={this.handleAddService}/>
								        	</Modal>
										</li>)
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

export default ProfileServicesForm