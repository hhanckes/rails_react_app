//ServiceProductUsedForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

class ServiceProductUsedForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
		this.onAddProduct = this.onAddProduct.bind(this)
        this.state = {
            name: '',
            brand: '',
            index: this.props.index
        };
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value}, this.onAddProduct);
    }

    onAddProduct() {
    	this.props.onAddProduct(this.state)
    }

    onDelete() {
    	
    }

    render() {
        return ( 
        	<div>
                <p>
                	<span>
                		Nombre: 
                		<input type="text" placeholder='Ejemplo: Base' name="name" value={ this.state.name } onChange={this.onChange} /> 
                	</span>
                	<span style={{marginLeft:'10px'}}>
                		Marca: 
                		<input type="text" placeholder='Ejemplo: Bobby Brown' name="brand" value={ this.state.brand } onChange={this.onChange} />
                	</span>
                	<Button className="button" bsStyle="primary" bsSize="xsmall" onClick={this.onDelete}>Eliminar</Button>
                </p>
        	</div>
        )
    }
}

export default ServiceProductUsedForm