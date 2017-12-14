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
    		services: []
  		}
	}

	openModal(id) {
		this.setState({ openModalId: id });
	};

	onCloseModal() {
		this.setState({ openModalId: 0 });
	};

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
								        	<Modal key={`Modal${service.id}`} show={ this.state.openModalId === service.id } onHide={ this.onCloseModal }>
									          <Modal.Header closeButton>
									            <Modal.Title>Modal heading</Modal.Title>
									          </Modal.Header>
									          <Modal.Body>
									            <h4>Text in a modal</h4>
									            <ServiceDetailForm key={ service.name } serviceId={service.id} serviceName={ service.name } onSaveService={this.handleAddService}/>
									            <hr />
									            <h4>Overflowing text to show scroll behavior</h4>
									            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
									            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
									          </Modal.Body>
									          <Modal.Footer>
									            <Button onClick={this.onCloseModal}>Close</Button>
									          </Modal.Footer>
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

export default ProfileServicesForm2