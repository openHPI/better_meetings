var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

/**
 * FluxAttendeeList
 * 
 * @module FluxAttendeeList
 * @require React
 * @require FluxMeetingActions
 *
 */
var FluxAttendeeItem = React.createClass({

    render: function(){

        var attendee = this.props.attendee;

        return (
            <a href="#" className="list-group-item">
                <div className="media-left">
                    <img className="img-circle img-xs" src="/images/av2.png" alt="Profile Picture" />
                </div>
                <div className="media-body">
                	<div className="text-lg">{attendee.name}</div>
                    <span className="text-muted">{attendee.email}</span>
                </div>
            </a>
        );
    }
});

module.exports = FluxAttendeeItem;
