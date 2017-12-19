import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';

class MultipleImagesUploader extends Component {
	
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(image) {
        this.props.onAddPicture(image)
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Selecciona las imagenes'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}

export default MultipleImagesUploader