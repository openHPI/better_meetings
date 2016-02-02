var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxMeetingStartFlyleaf = React.createClass({

    startMeeting: function() {
        FluxAgendaActions.startMeeting();
    },

    render: function(){
        var title = this.props.title;

        return(
            <div className="flux-agendaDetailsFlyleaf-container">
                <div id="page-title">
                    <h1>{title}</h1>
                </div>
                <button onClick={this.startMeeting}>Starte das Meeting</button>
            </div>
        );
    }
});

module.exports = FluxMeetingStartFlyleaf;