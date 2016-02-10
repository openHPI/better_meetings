var React = require('react');
var Link = require('react-router/modules/Link');

// Flux todolist view
var MeetingseriesItem = React.createClass({

    render: function() {
        var item = this.props.item;
        var index = this.props.index;

        return(
            <li key={index} className="meetingseries-item">
                <Link to={ "/meetingseries/" + item.id }>
                	<p className="meetingseries-title">{item.title}</p>
                </Link>
            </li>
        );
    }

});

module.exports = MeetingseriesItem;