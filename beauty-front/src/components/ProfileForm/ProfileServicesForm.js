//ProfileServicesForm.js
import React, { Component } from 'react'
import Modal from 'react-responsive-modal'; //https://react-responsive-modal.leopradel.com/
import ServiceDetailForm from './ServiceDetailForm'

class ProfileServicesForm extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleAddService = this.handleAddService.bind(this)
		this.state = {
    		selectedServicesId: [1, 2, 3],
    		openModal: false
  		}
	}

	onOpenModal = () => {
		this.setState({ openModal: true });
	};

	onCloseModal = () => {
		this.setState({ openModal: false });
	};

	handleAddService() {

	}

	handleClick(serviceName, id) {

	}

	render() {

		return (
			<div>
		    	<button onClick={this.onOpenModal}>Open modal</button>
	    	    
	    	    <Modal open={this.state.openModal} onClose={this.onCloseModal} little>
					<ServiceDetailForm />
	        	</Modal>

				<h3>Servicios</h3>
				<ul>
				 	<li onClick={ () => this.handleClick("Spa", 1) } className={ this.state.selectedServicesId.includes(1) ? 'selected' : '' }>Spa</li>
				    <li>Barbería</li>
				    <li>Salón de belleza</li>
				    <li>Peluquería</li>
				    <li>Spa de manos</li>
				    <li>Spa de pies</li>
				    <li>Manicure spa</li>
				    <li>Pedicure spa</li>
				</ul>
				<h3>Servicios</h3>
				 <ul>
				 	<li>Maquillaje</li>
					<li>Maquillaje para novias</li>
					<li>Maquillaje para matrimonio</li>
					<li>Maquillaje artístico</li>
					<li>Maquillaje cinematográfico</li>
					<li>Maquillaje para fotos</li>
					<li>Maquillaje para niños</li>
					<li>Pintucaritas</li>
					<li>Pintucaritas para halloween</li>
					<li>Maquillaje de fantasía</li>
				</ul>
			</div>
		)
	}
}

export default ProfileServicesForm