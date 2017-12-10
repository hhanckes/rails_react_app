//IdeaImageAvatar.js
import React, { Component } from 'react'
import Avatar from 'react-avatar-edit' //https://www.npmjs.com/package/react-avatar-edit

class IdeaImageAvatar extends Component {
	constructor(props) {
    	super(props)
    	this.state = {
      		preview: null,
      		src: ''
    	}
    	this.onCrop = this.onCrop.bind(this)
    	this.onClose = this.onClose.bind(this)
	}
  
  	onClose() {
    	this.setState({preview: null})
  	}
  
  	onCrop(preview) {
    	this.setState({preview: preview})
    	this.props.onImageChange(preview)
  	}
  
	render () {
	    return (
	      <div>
		    <div style={{float:'left'}}>
		        <Avatar
		          width={390}
		          height={295}
		          onCrop={this.onCrop}
		          onClose={this.onClose}
		          src={this.state.src}
		        />
	        </div>
	        <div>
	        	<img src={this.state.preview} alt="Preview" />
	        </div>
	      </div>
	    )
	}
}

export default IdeaImageAvatar;