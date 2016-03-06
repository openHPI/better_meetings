var React = require('react');
var MeetingStore = require('../stores/MeetingStore');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

var FluxTopicList = require('./FluxTopicList.react');
var FluxTopicDetails = require('./FluxTopicDetails.react');

var FluxAttendeeList = require('./FluxAttendeeList.react');
var FluxAttendeeForm = require('./FluxAttendeeForm.react');

var FluxMeetingTimer = require('./FluxMeetingTimer.react');
var FluxMeetingProgress = require('./FluxMeetingProgress.react');

var FluxQrViewer = require('./FluxQrViewer.react');

var FluxTodoList = require('./FluxTodoList.react');
var FluxTodoItemCreateForm = require('./FluxTodoItemCreateForm.react');
var FluxTodoItemUpdateForm = require('./FluxTodoItemUpdateForm.react');

var FluxTest = require('./FluxTest.react');

function getMeetingState() {
  return {
    isMeetingDataLoaded: MeetingStore.getIsMeetingDataLoaded(),

    user: MeetingStore.getUser(),
    canEdit: MeetingStore.canEdit(),

    meeting: MeetingStore.getMeetingData(),
    qrcode: MeetingStore.getQrCode(),
    selectedTopic: MeetingStore.getSelectedTopic(),
    allTodoItems: MeetingStore.getAllTodoItems(),
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
				<div className="boxed">
					<div id="content-container">
						<div id="page-content">
								<div className="row">
									<FluxMeetingProgress total={this.state.meeting.topics.length} index={this.state.selectedTopic} />
								</div>
								<div className="row">
					                <div className="col-md-9 col-lg-9">
					                  <h2>{this.state.meeting.title}</h2>
					                </div>
									<div className="col-md-3 col-lg-3">
										<FluxMeetingTimer timer={this.state.meeting.timer} />
									</div>
								</div>
								<div className="row">
									<button className="btn btn-info" onClick={this._onClick}>End Meeting</button>
								</div>

				              <div className="row">
				                <div className="col-md-4 col-lg-4">
				                	<div className="row">
				                		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				                  			<FluxTopicList items={this.state.meeting.topics} selected={this.state.selectedTopic} />
				                		</div>
				                	</div>
				                </div>
				                <div className="col-md-8 col-lg-8">
				                  <div className="row">
				                    <div className="col-md-12 col-lg-12">
				                      <FluxTopicDetails selected={this.state.meeting.topics[this.state.selectedTopic]} />
				                    </div>
				                  </div>
				                  <div className="row">
				                    <div className="col-md-12 col-lg-12">
				                      <div className="flux-todolist">
				                        <FluxTodoList allItems={this.state.allTodoItems} items={this.state.meeting.topics[this.state.selectedTopic].todos} attendees={this.state.meeting.attendees} canEdit={this.state.canEdit} />
				                      </div>
				                    </div>
				                  </div>
				                 </div>
								</div>
								<div className="row">
									<FluxQrViewer qrcode={this.state.qrcode}/>
								</div>
			    		</div>
			    	</div>
			    	<aside id="aside-container">
			    		<div id="aside">
			    			<div className="nano">
								<div className="nano-content">
									<FluxAttendeeList attendees={this.state.meeting.attendees} canEdit={this.state.canEdit} />
								</div>
							</div>
			    		</div>
			    	</aside>

			    	<FluxTodoItemCreateForm attendees={this.state.meeting.attendees} />
          			<FluxTodoItemUpdateForm attendees={this.state.meeting.attendees} item={this.state.editingTodoItem} canEdit={ this.state.canEdit } />

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
	},

	_onClick: function() {
		FluxMeetingActions.endMeeting();
	}

});

module.exports = FluxMeetingApp;
