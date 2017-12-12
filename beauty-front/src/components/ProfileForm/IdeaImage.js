//IdeaImage.js
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor' //https://github.com/mosch/react-avatar-editor
import InputRange from 'react-input-range' //https://github.com/davidchin/react-input-range
import '/Users/hans/Sites/rails_react_app/ideaboard/node_modules/react-input-range/lib/css/index.css';

class IdeaImage extends Component {
	constructor(props) {
  		super(props)
      	this.changeFile = this.changeFile.bind(this)
      	this.changeScale = this.changeScale.bind(this)
      	this.onClickSaveImage = this.onClickSaveImage.bind(this)
      	this.state = {
      		image: "https://images.fineartamerica.com/images-medium-large/1-jan-ingenhousz-dutch-physiologist-science-source.jpg",
      		scale: 1.2
      	}
  	}

	changeFile(e) {
  		this.setState({
    		image: e.target.files[0]
  		});
	}

	changeScale(value) {
		let scale = Math.round(value*100)/100;
  		this.setState({
    		scale: scale
  		});
	}

	onClickSaveImage() {
    	if (this.editor) {
	      	// This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
	      	// drawn on another canvas, or added to the DOM.
	      	const canvas = this.editor.getImage()
	      	var dataURL = canvas.toDataURL()
	      	console.log(dataURL)
	      	// If you want the image resized to the canvas size (also a HTMLCanvasElement)
	      	const canvasScaled = this.editor.getImageScaledToCanvas()
	      	console.log(canvasScaled.toDataURL())
    	}
  	}

	render() {
		return (
			<div style={{margin:'20px'}}>
				<div>Selecciona tu imagen: <input type="file" onChange={this.changeFile} /></div>
				<div style={{width:'350px'}}>Zoom <InputRange maxValue={2} minValue={1} step={0.01} value={this.state.scale} onChange={this.changeScale} /></div>
				<AvatarEditor
					ref={(editor) => this.editor = editor}
		        	image={this.state.image}
		        	width={250}
		        	height={250}
		        	border={50}
		        	borderRadius={100}
		        	color={[255, 255, 255, 0.6]} // RGBA
		        	scale={this.state.scale}
		        	rotate={0} />
		        <button className="newIdeaButton" onClick={this.onClickSaveImage}>Save Image</button>
			</div>
		)
	}
}

export default IdeaImage;