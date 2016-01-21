var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxServerConstants = require('../constants/FluxServerConstants');

// Define actions object
var FluxServerActions = {

	// Receive initial agenda data
	receiveMeetingData: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.DATA_RECEIVE,
			data: data
		})
	},

	// Start the Meeting
	startMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.MEETING_START
		})
	},

	// Add item to to-do list
	createTask: function(item) {
		AppDispatcher.handleAction({	
			actionType: FluxServerConstants.TODO_CREATE,
			data: item
		})
	},

	// Remove item from to-do list
	destroyTask: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.TODO_DESTROY,
			data: item
		})
	},

	// Add member to members
	createMember: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxServerActions.MEMBER_CREATE,
			data: item
		})
	}
};

module.exports = FluxServerActions;

