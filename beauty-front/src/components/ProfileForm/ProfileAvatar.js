//IdeaImageAvatar.js
import React, { Component } from 'react'
import Avatar from 'react-avatar-edit' //https://www.npmjs.com/package/react-avatar-edit

class ProfileAvatar extends Component {
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
	        <Avatar
	          width={300}
	          height={300}
	          onCrop={this.onCrop}
	          onClose={this.onClose}
	          src={this.state.src}
	        />
	    )
	}
}

export default ProfileAvatar;