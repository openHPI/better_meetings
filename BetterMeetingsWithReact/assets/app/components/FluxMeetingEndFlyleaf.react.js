var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Flux todolist view
var FluxMeetingEndFlyleaf = React.createClass({

	endMeeting: function() {
		MeetingDataAPI.endMeeting();
	},

    render: function(){

        return(
            <div className="flux-agendaMeetingEndFlyleaf-container">
                <h1>Ende</h1>
                <button onClick={this.endMeeting} >Beende das Meeting</button>
            </div>
        );
    }
});

module.exports = FluxMeetingEndFlyleaf;