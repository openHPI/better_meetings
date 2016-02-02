var React = require('react');
var AgendaStore = require('../stores/AgendaStore');
var FluxAgendaDetails = require('./FluxAgendaDetails.react');
var FluxMeetingStartFlyleaf = require('./FluxMeetingStartFlyleaf.react');
var FluxMeetingEndFlyleaf = require('./FluxMeetingEndFlyleaf.react');
var FluxAgenda = require('./FluxAgenda.react');
var FluxMemberTable = require('./FluxMemberTable.react');
var FluxMemberForm = require('./FluxMemberForm.react');
var FluxAgendaTimer = require('./FluxAgendaTimer.react');
var FluxTodoList = require('./FluxTodoList.react');
var FluxAgendaProgress = require('./FluxAgendaProgress.react');
var FluxAgendaUpload = require('./FluxAgendaUpload.react');

function getTodoListState () {
	return {
		user: AgendaStore.getUser(),
		canEdit: AgendaStore.getCanEdit(),
		title: AgendaStore.getTitle(),
		status: AgendaStore.getMeetingStatus(),
		timer: AgendaStore.getTimer(),
		agenda: AgendaStore.getAgenda(),
		selectedAgendaItem: AgendaStore.getSelected(),
		allTodoItems: AgendaStore.getAllTodoItems(),
		collapesedTodoItem: AgendaStore.getCollapsed(),
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

		switch (this.state.status) {

			case 0:
				return (
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<FluxAgendaProgress total={this.state.total} index={-1} />
							</div>
							<div className="row">
								<div className="col-md-3 col-lg-3 col-md-offset-9 col-lg-offset-9">
									<FluxAgendaTimer hasStarted={false} timer={this.state.timer} />
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-lg-8">
									<FluxMeetingStartFlyleaf title={this.state.title} />
								</div>
							</div>
						</div>
						<FluxMemberTable member={this.state.member} canEdit={this.state.canEdit}/>
						<FluxMemberForm />
					</div>
				);
				break;

			case 1:
				return (
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<FluxAgendaProgress total={this.state.total} index={this.state.index} />
							</div>
							<div className="row">
								<div className="col-md-3 col-lg-3 col-md-offset-9 col-lg-offset-9">
									<FluxAgendaTimer hasStarted={true} timer={this.state.timer} />
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-lg-8">
									<div className="row">
										<div className="col-md-4 col-lg-4">
											<FluxAgenda items={this.state.agenda} selected={this.state.selectedAgendaItem} />
										</div>
										<div className="col-md-8 col-lg-8">
											<FluxAgendaDetails items={this.state.agenda} selected={this.state.selectedAgendaItem} collapsed={this.state.collapesedTodoItem} member={this.state.member} />
										</div>
									</div>
								</div>
								<div className="col-md-4 col-lg-4">
									<div className="row">
										<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
											<div className="flux-todolist">
							                    <FluxTodoList allItems={this.state.allTodoItems} items={this.state.selectedAgendaItem.todos} collapsed={this.state.collapesedTodoItem} member={this.state.member} canEdit={this.state.canEdit} />
							                </div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<FluxMemberTable member={this.state.member} canEdit={this.state.canEdit}/>
						<FluxMemberForm />
					</div>
				);
				break;

			case 2:
				return (
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<FluxAgendaProgress total={this.state.total} index={this.state.total} />
							</div>
							<div className="row">
								<div className="col-md-3 col-lg-3 col-md-offset-9 col-lg-offset-9">
									<FluxAgendaTimer hasStarted={false} timer={this.state.timer} />
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-lg-8">
									<FluxMeetingEndFlyleaf title={this.state.title} />
								</div>
							</div>
						</div>
						<FluxMemberTable member={this.state.member} canEdit={this.state.canEdit}/>
						<FluxMemberForm />
					</div>
				);
				break;
		} 

	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getTodoListState());
	}

});

module.exports = FluxMeetingApp;