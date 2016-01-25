var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxMemberTableData = React.createClass({

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