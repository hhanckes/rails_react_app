//ProfileServicesForm.js
import React, { Component } from 'react'
import axios from 'axios'
import ServiceDetailForm from './ServiceDetailForm'
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper
import { Modal, Button } from 'react-bootstrap';

class ProfileServicesForm2 extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleAddService = this.handleAddService.bind(this)
		this.openModal = this.openModal.bind(this)
		this.onCloseModal = this.onCloseModal.bind(this)
		this.state = {
    		selectedServicesId: [],
    		openModalId: 0,
    		services: [],
    		test: 1
  		}
	}

	openModal(id) {
		this.setState({ openModalId: id, test: 1 })
	}

	onCloseModal() {
		this.setState({ openModalId: 0, test: 2 })
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

	handleAddService(serviceId) {
		if(!this.state.selectedServicesId.includes(serviceId)) {
	    	let selectedServicesId = update(this.state.selectedServicesId, {
      				$splice: [[0, 0, serviceId]] //splice() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    			})
	    	this.setState({
	    			openModalId: 0,
    				selectedServicesId: selectedServicesId
    			})
		} else {
			this.setState({
    					openModalId: 0
    				})
		}
	}

	handleClick(id) {
		this.openModal(id);
	}

	render() {
		let services = this.state.services.map((serviceCategory) => {
			return(
					<div key={`Div${serviceCategory.id}`} >
						<h3 key={ serviceCategory.id }>{ serviceCategory.name }</h3>
						<ul key={`Ul${serviceCategory.id}`}>
							{ 	serviceCategory.services.map((service) => {
									return (
										<div>
										<li key={ service.id } onClick={ this.handleClick.bind(this, service.id) }>
											{ this.state.selectedServicesId.includes(service.id) ?  '--> '+service.name : service.name }
										</li>
										<Modal key={`Modal${service.id}`} show={ this.state.openModalId === service.id } onHide={ this.onCloseModal }>
								          <Modal.Header closeButton>
								            <Modal.Title>Agrear servicio de {service.name}</Modal.Title>
								          </Modal.Header>
								          <Modal.Body>
								            <ServiceDetailForm key={ service.name } serviceId={service.id} serviceName={ service.name } onSaveService={this.handleAddService} />
								          </Modal.Body>
								          <Modal.Footer>
								            <Button onClick={ this.onCloseModal }>Close</Button>
								          </Modal.Footer>
								        </Modal>
								        </div>
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

export default ProfileServicesForm2