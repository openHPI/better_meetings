var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxMemberTableData = React.createClass({

    // Mark a member as present
    present: function() {
        FluxAgendaActions.markAsPresent(this.props.index);
    },

    // Mark a member as absent
    absent: function() {
        FluxAgendaActions.markAsAbsent(this.props.index);
    },

    render: function(){
        
        var attendee = this.props.attendee;

        return (
            <li id="flux-membertableRow" className="flux-membertableRow">
                <i className="fa fa-user"></i>{attendee.name}
            </li>
        )
    }
});

module.exports = FluxMemberTableData;