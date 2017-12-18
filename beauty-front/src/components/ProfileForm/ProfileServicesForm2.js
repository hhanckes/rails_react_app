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
    		selectedServicesData: [],
    		openModalId: 0,
    		services: []
  		}
	}

	openModal(id) {
		this.setState({ openModalId: id })
	}

	onCloseModal() {
		this.setState({ openModalId: 0 })
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

	handleAddService(serviceDetail) {
		let serviceId = serviceDetail.id

		if(!this.state.selectedServicesId.includes(serviceId)) {
	    	const selectedServicesId = update(this.state.selectedServicesId, {
      				$splice: [[0, 0, serviceId]]
    			})
			const selectedServicesData = update(this.state.selectedServicesData, {
      				$splice: [[0, 0, serviceDetail]]
    			})
	    	this.setState({
	    			openModalId: 0,
    				selectedServicesId: selectedServicesId,
    				selectedServicesData: selectedServicesData
    			})
		} else if (this.state.selectedServicesId.includes(serviceId) && !this.state.selectedServicesData.includes(serviceDetail)) {
			const index = this.state.selectedServicesData.findIndex(x => x.id === serviceDetail.id)
        	const selectedServicesData = update(this.state.selectedServicesData, { $splice: [[index, 0, serviceDetail]]})
        	this.setState({
	    			openModalId: 0,
    				selectedServicesData: selectedServicesData
    			})
		}
		else {
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
									            <ServiceDetailForm key={ service.name } serviceId={service.id} serviceName={ service.name } onSaveService={this.handleAddService} 
									            	data={this.state.selectedServicesId.includes(service.id) ? this.state.selectedServicesData.find(x => x.id === service.id) : ''} />
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