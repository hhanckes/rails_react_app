//ServiceProductUsedForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

class ServiceProductUsedForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
		this.onAddProduct = this.onAddProduct.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
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
    	this.props.onRemoveProduct(this.state)
    }

    render() {
        return ( 
        	<div>
                <p>
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