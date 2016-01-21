var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxAgendaDetailsFlyleaf = React.createClass({

    startMeeting: function() {
        FluxAgendaActions.startMeeting();
    },

    render: function(){

        return(
            <div className="flux-agendaDetailsFlyleaf-container">
                <h1>Ein Meeting mit Better Meetings, ist ein besseres Meeting</h1>
                <button onClick={this.startMeeting}>Starte das Meeting</button>
            </div>
        );
    }
});

module.exports = FluxAgendaDetailsFlyleaf;