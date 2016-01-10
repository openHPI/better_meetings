var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux agenda View
var FluxAgendaItem = React.createClass({

	// Select agenda item via Action
	selectItem: function(event) {
		FluxAgendaActions.selectAgendaItem(this.props.index);
	},

	// Render agenda View
	render: function() {
		var item = this.props.item;
		var index = this.props.index;
		var selected = this.props.selected;
		return (
            <li key={index} className={"agenda-item" + (item == selected ? " active" : "")} onClick={this.selectItem}>
                <h3 className="agenda-title">{item.title}</h3>
            </li>
		)
	}
})

module.exports = FluxAgendaItem;
