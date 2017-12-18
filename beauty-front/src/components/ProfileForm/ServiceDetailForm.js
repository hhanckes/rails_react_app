//ServiceDetailForm.js
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper
import ServiceProductsUsedDetailForm from './ServiceProductsUsedDetailForm'

class ServiceDetailForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.handleAddProduct = this.handleAddProduct.bind(this)
        this.handleAddNewProduct = this.handleAddNewProduct.bind(this)
        
        this.state = {
            price: this.props.data.price,
            time: this.props.data.time,
            id: this.props.serviceId,
            products: []
        };
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSave() {
        //Call API to add service
        this.props.onSaveService(this.state)
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

    render() {
        return ( 
        	<div>
                <p>Descripción general del servicio:</p>
                <textarea placeholder="Lo hago con mucho cariño" />
        		<hr />
                <p>Precio del servicio: <input type="text" placeholder='Precio' name="price" value={ this.state.price } onChange={this.onChange} /></p>
        		<p>Duración (minutos): <input type="text" placeholder='Duración del servicio' value={ this.state.time } name="time" onChange={this.onChange} /></p>
                <hr />
                <ServiceProductsUsedDetailForm onAddProduct={this.handleAddProduct} onAddNewProduct={this.handleAddNewProduct} products={this.state.products}/>
                <hr />
                <p>Fotos del servicio para tener de referencia:</p>
                <p>-completar-</p>
                <Button className="button" bsStyle="primary" onClick={this.onSave}>Guardar</Button>
        	</div>
        )
    }
}

export default ServiceDetailForm