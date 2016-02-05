var React = require('react');

// Flux todolist view
var MeetingSeriesItem = React.createClass({

    render: function() {
        var item = this.props.item;
        var index = this.props.index;

        return(
            <li key={index} className="jourfix-item">
                <p className="jourfix-title">{item.title}</p>
            </li>
        );
    }

});

module.exports = MeetingSeriesItem;