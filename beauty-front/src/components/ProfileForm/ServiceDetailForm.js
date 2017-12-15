//ServiceDetailForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ServiceProductsUsedDetailForm from './ServiceProductsUsedDetailForm'

class ServiceDetailForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.state = {
            price: '',
            time: 0
        };
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSave() {
        //Call API to add service
        this.props.onSaveService(this.props.serviceId)
    }

    render() {
        return ( 
        	<div>
        		<p>Precio del servicio: <input type="text" placeholder='Precio' name="price" className="mm-popup__input" onChange={this.onChange} /></p>
        		<p>Duración (minutos): <input type="text" placeholder='Duración del servicio' name="time" className="mm-popup__input" onChange={this.onChange} /></p>
                <hr />
                <ServiceProductsUsedDetailForm />
                <hr />
                <p>Fotos del servicio para tener de referencia:</p>
                <p>-completar-</p>
                <Button className="button" bsStyle="primary" onClick={this.onSave}>Guardar</Button>
        	</div>
        )
    }
}

export default ServiceDetailForm