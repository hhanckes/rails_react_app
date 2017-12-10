//CalendarForm.js

//ProfileForm.js
import React, {Component} from 'react'
import axios from 'axios'
import BigCalendar from 'react-big-calendar'; //http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro
import moment from 'moment';
import update from 'immutability-helper' //https://github.com/kolodny/immutability-helper
import '/Users/hans/Sites/rails_react_app/ideaboard/node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarForm.css';
import Popup from 'react-popup'; //http://minutemailer.github.io/react-popup/

moment.locale('ko', {
    week: {
        dow: 1,
        doy: 1,
    },
});
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


/*Agenda Rendering*/
//Outside the class
function Event({ event }) {
    return (
    	<div>
		<span>
      		<strong>
      			{event.title}
      		</strong>
            { event.desc && (':  ' + event.desc)}
    	</span>
    	</div>
    )
}

class CalendarForm extends Component {
	constructor(props) {
		super(props)
		this.eventDetailsPopUp = this.eventDetailsPopUp.bind(this)
		this.removeEvent = this.removeEvent.bind(this)
		this.state = {
			eventsList: [
			    {
			    	id: 1,
			        title: 'Meeting',
			        start: new Date(2017, 11, 7, 10, 30, 0, 0),
			        end: new Date(2017, 11, 7, 12, 30, 0, 0),
			        desc: 'Pre-meeting meeting, to prepare for the meeting'
			    },
			    {
			    	id: 2,
			        title: 'Lunch',
			        start:new Date(2017, 11, 5, 12, 0, 0, 0),
			        end: new Date(2017, 11, 5, 13, 0, 0, 0),
			        desc: 'Power lunch'
			    }],
			eventLastCreatedID: 3
		}
	}

	/* When you choose a particular slot on the calendar */
	onSlotChange(slotInfo) {
		let newId = this.state.eventLastCreatedID + 1
	    let newEvent = {
	    	id: newId,
	    	title: 'Disponible',
	    	start: slotInfo.start,
	    	end: slotInfo.end,
	    	desc: 'Horario disponible para atender'
	    }
	    let eventsList = update(this.state.eventsList, {
      			$splice: [[0, 0, newEvent]] //splice() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    		})
	    this.setState({
    			eventsList: eventsList,
    			eventLastCreatedID: newId
    		})
	}

	/* When you click on an already booked slot */
	onEventClick(event) {
	    console.log(event) //Shows the event details provided while booking
	    this.eventDetailsPopUp(event)
	}

	removeEvent(id) {
		const eventIndex = this.state.eventsList.findIndex(x => x.id === id)
		const eventsList = update(this.state.eventsList, { $splice: [[eventIndex, 1]]})
		this.setState({eventsList: eventsList})
	}

	eventDetailsPopUp(event) {
		let content = 'Está disponible este bloque que comienza a las X y termina <br/>a las Y'
		let popup = Popup.create({
	    	title: 'Bloque disponible',
	    	content: content,
	    	buttons: {
		        left: [{
		            text: 'Eliminar disponibilidad',
		            className: 'danger',
		            key: 'esc',
		            action: () => {
	        		    this.removeEvent(event.id)
		                /** Close this popup. Close will always close the current visible one, if one is visible */
		                Popup.close();
		            }
		        }],
		        right: [{
		            text: 'Mantener',
		            key: '⌘+enter',
		            className: 'success',
		            action: function () {
		                /** Close this popup. Close will always close the current visible one, if one is visible */
		                Popup.close();
		            }
		        }]
	    }
	});
	}

	render() {
		let minTime = new Date();
    	minTime.setHours(6,0,0);
    		
    	let maxTime = new Date();
    	maxTime.setHours(23,59,0);

		let formats = {
      		dayFormat: 'dddd'
		}

		return (
			<div style={{width:'70%', margin:'0 auto', fontSize:'11px'}}>
			<Popup />
		    <BigCalendar
			    selectable
			    onSelectEvent={event => this.onEventClick(event)}
			    onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo) }
			    events={this.state.eventsList}
			    step={30}
			    timeslots={2}
			    defaultView='week'
			    views={['week']}
			    toolbar={false}
			    min={minTime}
			    max={maxTime}
			    formats={formats}
			    defaultDate={new Date()}
			    components={{
			            event: Event
			    }}
			 />
		  </div>	
        )
	}
}

export default CalendarForm