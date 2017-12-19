//ProfileServicesForm.js
import React, { Component } from 'react'
import axios from 'axios'
import ServiceDetailForm from './ServiceDetailForm'
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper
import { Modal, Button } from 'react-bootstrap';

class ProfileServicesForm extends Component {
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

	onAddService() {
		this.props.handleAddService()
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
													//TODO//
													<p>Descripción general del servicio:</p>
													<textarea placeholder="Lo hago con mucho cariño" />
													<hr />
													<p>Precio del servicio: <input type="text" placeholder='Precio' name="price" value={ this.state.price } onChange={this.onChange} /></p>
													<p>Duración (minutos): <input type="text" placeholder='Duración del servicio' value={ this.state.time } name="time" onChange={this.onChange} /></p>
													<hr />
													<ServiceProductsUsedDetailForm onAddProduct={this.handleAddProduct} onAddNewProduct={this.handleAddNewProduct} onRemoveProduct={this.handleRemoveProduct} products={this.state.products}/>
													<hr />
													<p>Fotos del servicio para tener de referencia:</p>
													<MultipleImagesUploader onAddPicture={ this.handleAddPicture } />
													<Button className="button" bsStyle="primary" onClick={this.onSave}>Guardar</Button>
									          </Modal.Body>
									          <Modal.Footer>
									            <Button onClick={ this.onCloseModal }>Close</Button>
									            <Button bsStyle="primary" onClick={ this.onAddService }>Save changes</Button>
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

export default ProfileServicesForm