var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');

// Define actions object
var FluxAgendaActions = {

	// Receive initial agenda data
	receiveAgenda: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.RECEIVE_DATA,
			data: data
		})
	},

	// Select agenda item
	selectAgendaItem: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.SET_SELECTED,
			data: data
		})
	},

	// Add item to to-do list
	addToList: function(item) {
		AppDispatcher.handleAction({	
			actionType: FluxAgendaConstants.TODO_ADD,
			data: item
		})
	},

	// Remove item from to-do list
	removeFromList: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.TODO_REMOVE,
			data: index
		})
	},

	markAsDone: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.TODO_DONE,
			data: index
		})
	},

	// Mark a member as present
	markAsPresent: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEMBER_PRESENT,
			data: index
		})
	},

	// Mark a member as absent
	markAsAbsent: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEMBER_ABSENT,
			data: index
		})
	},

	// Start the Meeting
	startMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEETING_START
		})
	}
};

module.exports = FluxAgendaActions;