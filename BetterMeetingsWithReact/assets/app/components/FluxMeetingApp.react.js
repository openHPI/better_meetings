var React = require('react');
var MeetingStore = require('../stores/MeetingStore');

var FluxTopicList = require('./FluxTopicList.react');
var FluxTopicDetails = require('./FluxTopicDetails.react');

var FluxAttendeeList = require('./FluxAttendeeList.react');
var FluxAttendeeForm = require('./FluxAttendeeForm.react');

var FluxMeetingTimer = require('./FluxMeetingTimer.react');
var FluxMeetingProgress = require('./FluxMeetingProgress.react');

var FluxTodoList = require('./FluxTodoList.react');
var FluxTodoItemCreateForm = require('./FluxTodoItemCreateForm.react');
var FluxTodoItemUpdateForm = require('./FluxTodoItemUpdateForm.react');

function getMeetingState () {
	return {
		isMeetingDataLoaded: MeetingStore.getIsMeetingDataLoaded(),

		user: MeetingStore.getUser(),

		title: MeetingStore.getTitle(),
		timer: MeetingStore.getTimer(),
		topics: MeetingStore.getTopics(),
		selectedTopic: MeetingStore.getSelectedTopic(),
		allTodoItems: MeetingStore.getAllTodoItems(),
		attendees: MeetingStore.getAttendees(),
		editingTodoItem: MeetingStore.getEditingTodoItem()
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
		MeetingStore.addChangeListener(this._onChange);
	},

	// Remove change listener from stores
	componentWillUnmount: function() {
		MeetingStore.removeChangeListener(this._onChange);
	},

	// Render our child components, passing state via props
	render: function() {

		if(this.state.isMeetingDataLoaded) {

			return (
				<div className="content">
					<div className="container-fluid">
						<div className="row">
							<FluxMeetingProgress total={this.state.topics.length} index={this.state.selectedTopic} />
						</div>
						<div className="row">
			                <div className="col-md-9 col-lg-9">
			                  <h2>{this.state.title}</h2>
			                </div>
							<div className="col-md-3 col-lg-3">
								<FluxMeetingTimer timer={this.state.timer} />
							</div>
						</div>
					</div>

					<div className="container">
		              <div className="row">
		                <div className="col-md-4 col-lg-4">
		                  <FluxTopicList items={this.state.topics} selected={this.state.selectedTopic} />
		                </div>
		                <div className="col-md-8 col-lg-8">
		                  <div className="row">
		                    <div className="col-md-12 col-lg-12">
		                      <FluxTopicDetails selected={this.state.topics[this.state.selectedTopic]} />
		                    </div>
		                  </div>
		                  <div className="row">
		                    <div className="col-md-12 col-lg-12">
		                      <div className="flux-todolist">
		                        <FluxTodoList allItems={this.state.allTodoItems} items={this.state.topics[this.state.selectedTopic].todos} attendees={this.state.attendees} canEdit={this.state.user.isAdmin} />
		                      </div>
		                    </div>
		                  </div>
		                 </div>
						</div>
					</div>

	    			<FluxAttendeeList attendees={this.state.attendees} canEdit={this.state.canEdit} />
					<FluxAttendeeForm />
					<FluxTodoItemCreateForm attendees={this.state.attendees} />
					<FluxTodoItemUpdateForm attendees={this.state.attendees} item={this.state.editingTodoItem} canEdit={ this.state.user.isAdmin } />
				</div>
			);
		}

		else {
			return <div>Lädt Meeting Informationen... </div>
		}

	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getMeetingState());
	}

});

module.exports = FluxMeetingApp;
