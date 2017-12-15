//ServiceProductsUsedDetailForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

class ServiceProductsUsedDetailForm extends Component {
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
        		<p>Productos utilizados para realizar este servicio:</p>
        	</div>
        )
    }
}

export default ServiceProductsUsedDetailForm