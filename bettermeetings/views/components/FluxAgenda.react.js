var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');
var FluxAgendaItem = require('./FluxAgendaItem.react');

// Flux agenda View
var FluxAgenda = React.createClass({

	// Select agenda item via Action
	selectItem: function(event) {
		FluxAgendaActions.selectAgendaItem(index);
	},

	selectPrevious: function(event) {
		var index = (this.props.items.indexOf(this.props.selected) - 1);
		var index = (0 > index) ? (this.props.items.length-1) : index;
		FluxAgendaActions.selectAgendaItem(index);
	},

	// Select next agenda item
	selectNext: function(event) {
		var index = (this.props.items.indexOf(this.props.selected) + 1) % this.props.items.length;
		FluxAgendaActions.selectAgendaItem(index);
	},

	// Render agenda View
	render: function() {
		var items = this.props.items;
		var selected = this.props.selected;
		return (
			<div className="flux-agenda-container">
				<div className="flux-agenda-list">
					<ul>
						{Object.keys(items).map(function(index) {
                            return (
                                <FluxAgendaItem item={items[index]} index={index} selected={selected} />
                            )
                        })}
                    </ul>
                </div>
                <div className="btn-group" role="group" aria-label="...">
				  <button type="button" className="btn btn-default">
				  	<span className="glyphicon glyphicon-chevron-left" aria-hidden="true" onClick={this.selectPrevious}></span>
				  </button>
				  <button type="button" className="btn btn-default">
				  	<span className="glyphicon glyphicon-chevron-right" aria-hidden="true" onClick={this.selectNext}></span>
				  </button>
				</div>
			</div>
		)
	}
})

module.exports = FluxAgenda;
