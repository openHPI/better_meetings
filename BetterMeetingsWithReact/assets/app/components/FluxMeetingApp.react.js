var React = require('react');
var AgendaStore = require('../stores/AgendaStore');
var FluxAgendaDetails = require('./FluxAgendaDetails.react');
var FluxAgendaDetailsFlyleaf = require('./FluxAgendaDetailsFlyleaf.react');
var FluxAgenda = require('./FluxAgenda.react');
var FluxMemberTable = require('./FluxMemberTable.react');
var FluxAgendaTimer = require('./FluxAgendaTimer.react');
var FluxAgendaProgress = require('./FluxAgendaProgress.react');
var FluxAgendaUpload = require('./FluxAgendaUpload.react');

function getTodoListState () {
	return {
		hasStarted: AgendaStore.hasStarted(),
		timer: AgendaStore.getTimer(),
		agenda: AgendaStore.getAgenda(),
		selectedAgendaItem: AgendaStore.getSelected(),
		member: AgendaStore.getMember(),
		total: AgendaStore.getAgendaTotal(),
		index: AgendaStore.getAgendaIndex()
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

		if (this.state.hasStarted) {
			return (
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="row">
							<div className="col-md-9 col-lg-9">
								<FluxAgendaDetails items={this.state.agenda} selected={this.state.selectedAgendaItem} member={this.state.member} />
							</div>
							<div className="col-md-3 col-lg-3">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<FluxMemberTable member={this.state.member} />
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<FluxAgendaTimer hasStarted={this.state.hasStarted} timer={this.state.timer} />
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-9 col-lg-9">
								<FluxAgendaProgress total={this.state.total} index={this.state.index} />
							</div>
							<div className="col-md-3 col-lg-3">
								<FluxAgendaUpload />
							</div>
						</div>
					</div>
				</div>
			);
		} 

		else {
			return (
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="row">
							<div className="col-md-9 col-lg-9">
								<FluxAgendaDetailsFlyleaf selected={this.state.selectedAgendaItem} member={this.state.member} />
							</div>
							<div className="col-md-3 col-lg-3">
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<FluxMemberTable member={this.state.member} />
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										<FluxAgendaTimer hasStarted={this.state.hasStarted} timer={this.state.timer} />
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-9 col-lg-9">
								<FluxAgendaProgress total={this.state.total} index={-1} />
							</div>
							<div className="col-md-3 col-lg-3">
								<FluxAgendaUpload />
							</div>
						</div>
					</div>
				</div>
			);
		}

	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getTodoListState());
	}

});

module.exports = FluxMeetingApp;