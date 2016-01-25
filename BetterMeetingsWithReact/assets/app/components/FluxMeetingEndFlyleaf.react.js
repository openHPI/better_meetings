var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxMeetingEndFlyleaf = React.createClass({

    render: function(){

        return(
            <div className="flux-agendaMeetingEndFlyleaf-container">
                <h1>Ende</h1>
                <button>Beende das Meeting</button>
            </div>
        );
    }
});

module.exports = FluxMeetingEndFlyleaf;