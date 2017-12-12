//ServiceDetailForm.js
import React, { Component } from 'react'

class ServiceDetailForm extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this)
        this.state = {
            value: ''
        };
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({value: value});
    }

    render() {
        return ( 
        	<div>
        		<p><input type="text" placeholder='Precio' className="mm-popup__input" onChange={this.onChange} /></p>
        		<p><input type="text" placeholder='Duración del servicio' className="mm-popup__input" onChange={this.onChange} /></p>
        	</div>
        )
    }
}

export default ServiceDetailForm