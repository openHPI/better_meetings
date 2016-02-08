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
	removeFromList: function(id) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.TODO_REMOVE,
			data: id
		})
	},

	// Mark task as done
	toggleDone: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.TODO_TOGGLE_DONE,
			data: item
		})
	},

	// Collapse the item with index
	collapsTodoItem: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.TODO_COLLAPSE,
			data: index
		})
	},

	// Add a member to the meeting
	addMember: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEMBER_ADD,
			data: data
		})
	},

	// Start the Meeting
	startMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEETING_START
		})
	},

	// End the Meeting
	endMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.MEETING_END
		})
	}
};

module.exports = FluxAgendaActions;