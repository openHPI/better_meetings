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

    getRandomImage: function(min, max) {
        var random = Math.floor((Math.random() * max) + min);
        return ("/images/av" + random + ".png");
    },

    render: function(){

        var attendee = this.props.attendee;
        var isUser = this.props.isUser;

        return (
            <a href="" className={"list-group-item" + (isUser ? " user" : "") }>
                <div className="media-left">
                    <img className="img-circle img-xs" src={this.getRandomImage(1,6)} alt="Profile Picture" />
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
