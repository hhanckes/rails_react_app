//IdeasContainer.js
import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'
import IdeaForm from './IdeaForm'
import IdeaImage from './IdeaImage'
import IdeaImageAvatar from './IdeaImageAvatar'
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper

class IdeasContainer extends Component {

	constructor(props) {
  		super(props)
  		this.addNewIdea = this.addNewIdea.bind(this)
  		this.updateIdea = this.updateIdea.bind(this)
  		this.resetNotification = this.resetNotification.bind(this)
      this.enableEditing = this.enableEditing.bind(this)
      this.deleteIdea = this.deleteIdea.bind(this)
  		this.state = {
    		ideas: [],
    		editingIdeaId: null,
    		notification: '',
        step: 1,
        thread: []
  		}
  	}

  componentDidMount() {
  	axios.get('http://localhost:3001/api/v1/ideas')
  		.then(response => {
   			console.log(response)
   			this.setState({ideas: response.data})
  		})
  		.catch(error => {
  			console.log(error)
  		})
	}

	addNewIdea() {
		axios.post('http://localhost:3001/api/v1/ideas', {
    			idea: { title: '', body: '' }
    		})
  			.then(response => {
    			console.log(response)
    			let ideas = update(this.state.ideas, {
      				$splice: [[0, 0, response.data]] //splice() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    			})
    			this.setState({
    				ideas: ideas, 
    				editingIdeaId: response.data.id
    			})
  			})
  			.catch(error => console.log(error))
	}

	updateIdea(idea) {
		const ideaIndex = this.state.ideas.findIndex((x) => x.id === idea.id) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  		const ideas = update(this.state.ideas, {
    		[ideaIndex]: { $set: idea }
  		})
  		this.setState({ideas: ideas, notification: 'All changes saved'})
	}

  deleteIdea(id) {
    axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
      .then(response => {
        console.log(response)
        const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
        const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]})
        this.setState({ideas: ideas})
    })
    .catch(error => console.log(error))
  }

	resetNotification() {
		this.setState({ notification: '' })
 	}

  enableEditing(id) {
    this.setState({editingIdeaId: id}, () => { this.title.focus() })
  }

	render() {
		let ideas = this.state.ideas.map((idea) => {
				return (this.state.editingIdeaId === idea.id) ? 
					( <IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification} titleRef= {(input) => this.title = input} /> ) : 
					( <Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.deleteIdea} /> )
	     	});

	    return (
	    	<div>
          <IdeaImageAvatar />
	    		<button className="newIdeaButton" onClick={this.addNewIdea}>New Idea</button>
	    		<span className="notification">{ this.state.notification }</span>
	    		<div>
	    			{ ideas }
	    		</div>
	    	</div>
	    )
	}
}

export default IdeasContainer