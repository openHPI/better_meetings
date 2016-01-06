var React = require('react');
var AgendaStore = require('../stores/AgendaStore');
var FluxAgendaDetails = require('./FluxAgendaDetails.react');
var FluxAgenda = require('./FluxAgenda.react');

function getTodoListState () {
	return {
		agenda: AgendaStore.getAgenda(),
		selectedAgendaItem: AgendaStore.getSelected(),
		member: AgendaStore.getMember()
	};
}

// Define main Controller View
var FluxMeetingApp = React.createClass({

	// Get initial state from stores
	getInitialState: function() {
		return getTodoListState();
	},

	// Add change listeners to stores
	componentDidMount: function() {
		AgendaStore.addChangeListener(this._onChange);
	},

	// Remove change listener from stores
	componentWillUnmount: function() {
		AgendaListStore.removeChangeListener(this._onChange);
	},

	// Render our child components, passing state via props
	render: function() {
		return (
			<div className="row">
					<div className="col-lg-3">
						<FluxAgenda items={this.state.agenda} selected={this.state.selectedAgendaItem} />
					</div>
					<div className="col-lg-9">
						<FluxAgendaDetails selected={this.state.selectedAgendaItem} member={this.state.member} />
					</div>
			</div>
		);
	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getTodoListState());
	}

});

module.exports = FluxMeetingApp;