var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux agenda View
var FluxTopicItem = React.createClass({

	// Select agenda item via Action
	selectItem: function(event) {
		FluxMeetingActions.selectTopic(this.props.index);
	},

	// Render agenda View
	render: function() {
		var items = this.props.items;
		var index = this.props.index;
		var level = this.props.level;

		var item = (0 <= index && index < items.length) ? items[index] : null;

		return (
            <li key={index} className={"agenda-item level-" + level} onClick={this.selectItem}>
                <h3 className="agenda-title">{ (item !== null ) ? item.title : "" }</h3>
            </li>
		)
	}
})

module.exports = FluxTopicItem;
