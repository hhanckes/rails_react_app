//ServiceDetailForm.js
import React, { Component } from 'react'

class ServiceDetailForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.state = {
            value: ''
        };
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({value: value});
    }

    onSave() {
        //Call API to add service
        this.props.onSaveService(this.props.serviceId)
    }

    render() {
        return ( 
        	<div>
                <h1>{ this.props.serviceName }</h1>
        		<p>Precio del servicio: <input type="text" placeholder='Precio' className="mm-popup__input" onChange={this.onChange} /></p>
        		<p>Duración (minutos): <input type="text" placeholder='Duración del servicio' className="mm-popup__input" onChange={this.onChange} /></p>
                <button className="button" onClick={this.onSave}>Guardar</button>
        	</div>
        )
    }
}

export default ServiceDetailForm