var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxMeetingStartFlyleaf = React.createClass({

    startMeeting: function() {
        FluxAgendaActions.startMeeting();
    },

    render: function(){

        return(
            <div className="flux-agendaDetailsFlyleaf-container">
                <div id="page-title">
                    <h1>Meeting Title</h1>
                </div>
                <button onClick={this.startMeeting}>Starte das Meeting</button>
            </div>
        );
    }
});

module.exports = FluxMeetingStartFlyleaf;