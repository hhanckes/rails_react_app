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
    		selectedServicesData: [],
    		openModalId: 0,
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

	openModal(id) {
		this.setState({ openModalId: id })
	}

	onCloseModal() {
		this.setState({ openModalId: 0 })
	}

	handleClick(id) {
		this.openModal(id);
	}

	handleAddService(serviceDetail) {
		this.props.onAddService(serviceDetail)

		let serviceData = this.state.selectedServicesData.find(x => x.id === serviceDetail.id)

		if(!serviceData) {
			const selectedServicesData = update(this.state.selectedServicesData, {
      				$splice: [[0, 0, serviceDetail]]
    			})
	    	this.setState({
	    			openModalId: 0,
    				selectedServicesData: selectedServicesData
    			})
		} else {
			const index = this.state.selectedServicesData.findIndex(x => x.id === serviceDetail.id)
        	const selectedServicesData = update(this.state.selectedServicesData, { $splice: [[index, 0, serviceDetail]]})
        	this.setState({
	    			openModalId: 0,
    				selectedServicesData: selectedServicesData
    			})
		}
	}

	handleAddProduct(value) {
        const products = update(this.state.products, {
                    $splice: [[value.index, 1, value]]
                })
            this.setState({
                    products: products
                })
    }

    handleAddNewProduct() {
        const blankProduct = {
            name: '',
            brand: '',
            index: this.state.products.length
        }
        const products = update(this.state.products, {
                    $splice: [[this.state.products.length, 1, blankProduct]]
                })
            this.setState({
                    products: products
                })
    }

    handleRemoveProduct(value) {
        const products = update(this.state.products, {
                    $splice: [[value.index, 1]]
                })
            this.setState({
                    products: products
                })
    }

    handleAddPicture(serviceId, image) {
    	let serviceData = this.state.selectedServicesData.find(x => x.id === serviceId) || 
        this.setState({
            pictures: this.state.images.concat(image)
        });
    }

	render() {
		let services = this.state.services.map((serviceCategory) => {
			return(
					<div key={`Div${serviceCategory.id}`} >
						<h3 key={ serviceCategory.id }>{ serviceCategory.name }</h3>
						<ul key={`Ul${serviceCategory.id}`}>
							{ 	serviceCategory.services.map((service) => {
									let serviceData = this.state.selectedServicesData.find(x => x.service_id === service.id)
									return (
										<div>
											<li key={ service.id } onClick={ this.handleClick.bind(this, service.id) }>
												{ serviceData ?  '--> '+service.name : service.name }
											</li>
											<Modal key={`Modal${service.id}`} show={ this.state.openModalId === service.id } onHide={ this.onCloseModal }>
									          <Modal.Header closeButton>
									            <Modal.Title>Agrear servicio de {service.name}</Modal.Title>
									          </Modal.Header>
									          <ServiceDetailForm key={ service.name } serviceId={service.id} serviceName={ service.name } onSaveService={ this.handleAddService } 
									            	data={serviceData ? serviceData : ''} onClose={ this.onCloseModal }/>
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