/**
 * Provides an interface of actions for the flux-components
 * 
 * @module FluxAgendaActions
 *
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');

// Define actions object
var FluxAgendaActions = {
	
	receiveAgenda: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.RECEIVE_DATA,
			data: data
		})
	},

	/**
	 * Selects an agenda item
	 * 
	 * @method selectAgendaItem
	 * @param {Integer} index The index of the selected agenda item 
	 */
	selectAgendaItem: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxAgendaConstants.SET_SELECTED,
			data: index
		})
	},

	/**
	 * Adds a new todo item to the todolist
	 * 
	 * @method addToList
	 * @param {Object} item The new todo item 
	 */
	addToList: function(item) {
		AppDispatcher.handleAction({	
			actionType: FluxAgendaConstants.TODO_ADD,
			data: item
		})
	},

	/**
	 * Removes a todo item from the todolist
	 * 
	 * @method removeFromList
	 * @param {Integer} id The id of the 
	 */
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