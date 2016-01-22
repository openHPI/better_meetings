var React = require('react');
var FluxAgendaItem = require('./FluxAgendaItem.react');

// Flux agenda View
var FluxAgenda = React.createClass({

	// Render agenda View
	render: function() {
		var items = this.props.items;
		var selected = this.props.selected;
		var selectedIndex = items.indexOf(selected);

		return (
			<div className="flux-agenda-container">
				<div className="flux-agenda-list">
					<ul>
                        <FluxAgendaItem items={items} index={selectedIndex - 1} level={1} />
                        <FluxAgendaItem items={items} index={selectedIndex} level={0} />
                        <FluxAgendaItem items={items} index={selectedIndex + 1} level={1} />
                        <FluxAgendaItem items={items} index={selectedIndex + 2} level={2} />
                        <FluxAgendaItem items={items} index={selectedIndex + 3} level={3} />
                    </ul>
                </div>
			</div>
		)
	}
})

module.exports = FluxAgenda;
