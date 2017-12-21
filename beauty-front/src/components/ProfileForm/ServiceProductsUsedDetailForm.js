//ServiceProductsUsedDetailForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ServiceProductUsedForm from './ServiceProductUsedForm'

class ServiceProductsUsedDetailForm extends Component {
    constructor(props) {
        super(props);
        this.onAddProduct = this.onAddProduct.bind(this)
        this.addNewProduct = this.addNewProduct.bind(this)
        this.onRemoveProduct = this.onRemoveProduct.bind(this)
    }

    onAddProduct(state) {
        this.props.onAddProduct(state)
    }

    addNewProduct() {
        this.props.onAddNewProduct();
    }

    onRemoveProduct(state) {
        this.props.onRemoveProduct(state);   
    }

    render() {
        let products = this.props.products.map( (prod) => {
            return (
                    <ServiceProductUsedForm key={ prod.index } index={ prod.index } brand={prod.brand} onAddProduct={this.onAddProduct} onRemoveProduct={this.onRemoveProduct} />
                )
        })

        return ( 
        	<div>
        		<p>Marcas de los productos utilizados para realizar este servicio:</p>
                { products }
                <p><Button className="button" bsStyle="primary" bsSize="xsmall" onClick={this.addNewProduct}>Agregar Producto</Button></p>
        	</div>
        )
    }
}

export default ServiceProductsUsedDetailForm