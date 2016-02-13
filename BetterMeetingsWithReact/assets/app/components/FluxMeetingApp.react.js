var React = require('react');
var MeetingStore = require('../stores/MeetingStore');

var FluxTopicList = require('./FluxTopicList');
var FluxTopicDetails = require('./FluxTopicDetails.react');

var FluxMeetingStartFlyleaf = require('./FluxMeetingStartFlyleaf.react');
var FluxMeetingEndFlyleaf = require('./FluxMeetingEndFlyleaf.react');

var FluxAttendeeList = require('./FluxAttendeeList.react');
var FluxAttendeeForm = require('./FluxAttendeeForm.react');

var FluxMeetingTimer = require('./FluxMeetingTimer.react');
var FluxMeetingProgress = require('./FluxMeetingProgress.react');

var FluxTodoList = require('./FluxTodoList.react');

function getMeetingState () {
	return {
		user: MeetingStore.getUser(),
		canEdit: MeetingStore.getCanEdit(),

		title: MeetingStore.getTitle(),
		status: MeetingStore.getMeetingStatus(),
		timer: MeetingStore.getTimer(),
		topics: MeetingStore.getTopics(),
		selectedTopic: MeetingStore.getSelectedTopic(),
		allTodoItems: MeetingStore.getAllTodoItems(),
		collapesedTodoItem: MeetingStore.getCollapsedTodoItem(),
		attendees: MeetingStore.getAttendees()
	};
}

/**
 * Main component
 * 
 * @module FluxMeetingApp
 * @require React
 * @require MeetingStore
 * @require FluxTopicList
 * @require FluxTopicDetails
 * @require FluxAttendeeList
 * @require FluxAttendeeFrom
 * @require FluxMeetingTimer
 * @require FluxMeetingProgress
 * @require FluxTodoList 
 *
 */
var FluxMeetingApp = React.createClass({

	// Get initial state from stores
	getInitialState: function() {
		return getMeetingState();
	},

	// Add change listeners to stores
	componentDidMount: function() {
		topicStore.addChangeListener(this._onChange);
	},

	// Remove change listener from stores
	componentWillUnmount: function() {
		topicStore.removeChangeListener(this._onChange);
	},

	// Render our child components, passing state via props
	render: function() {

		return (
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<FluxMeetingProgress total={this.state.topics.length} index={this.state.topics.indexOf(this.state.selectedTopic)} />
					</div>
					<div className="row">
		                <div className="col-md-9 col-lg-9">
		                  <h2>{this.state.title}</h2>
		                </div>
						<div className="col-md-3 col-lg-3">
							<FluxMeetingTimer hasStarted={true} timer={this.state.timer} />
						</div>
					</div>
				</div>

				<div className="container">
	              <div className="row">
	                <div className="col-md-4 col-lg-4">
	                  <FluxTopicList items={this.state.topic} selected={this.state.selectedTopic} />
	                </div>
	                <div className="col-md-8 col-lg-8">
	                  <div className="row">
	                    <div className="col-md-12 col-lg-12">
	                      <FluxTopicDetails selected={this.state.selectedTopic} />
	                    </div>
	                  </div>
	                  <div className="row">
	                    <div className="col-md-12 col-lg-12">
	                      <div className="flux-todolist">
	                        <FluxTodoList allItems={this.state.allTodoItems} items={this.state.selectedTopic.todos} collapsed={this.state.collapesedTodoItem} attendees={this.state.attendees} canEdit={this.state.canEdit} />
	                      </div>
	                    </div>
	                  </div>
	                 </div>
					</div>
				</div>

    			<FluxAttendeeList attendees={this.state.attendees} canEdit={this.state.canEdit} />
				<FluxAttendeeForm />
			</div>
		);

	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getMeetingState());
	}

});

module.exports = FluxMeetingApp;
