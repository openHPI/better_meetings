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
            <tr id="flux-membertableRow" className={(attendee.status !== undefined) ? "flux-membertableRow " + attendee.status : "flux-membertableRow"} >
                <td>{attendee.name}</td>
                <td><i className="fa fa-check" onClick={this.present}></i></td>
                <td><i className="fa fa-times" onClick={this.absent}></i></td>
            </tr>
        )
    }
});

module.exports = FluxMemberTableData;