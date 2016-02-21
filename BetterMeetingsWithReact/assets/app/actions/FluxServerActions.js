var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxServerConstants = require('../constants/FluxServerConstants');

/**
 * Handles server actions
 * 
 * @module FluxAgendaActions
 * @require AppDispatcher
 * @require FluxServerConstants
 *
 */
var FluxServerActions = {

	/**
	 * Loads the meeting data into the view
	 * 
	 * @method receiveMeetingData
	 * @param {Object} data The meeting data
	 */
	receiveMeetingData: function(data) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.DATA_RECEIVE,
			data: data
		})
	},

	receiveUser: function(user) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.USER_RECEIVE,
			data: user
		})
	},

	// Start the Meeting
	startMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.MEETING_START
		})
	},

	/**
	 * Adds a new todo item
	 * 
	 * @method addTodoItem
	 * @param {Object} item The new todo item
	 */
	addTodoItem: function(item) {
		AppDispatcher.handleAction({	
			actionType: FluxServerConstants.TODO_ADD,
			data: item
		})
	},

	/**
	 * Updates a todo item
	 * 
	 * @method updateTodoItem
	 * @param {Object} item The updated todo item
	 * @param {Object} previousItem The the item before the update
	 */
	updateTodoItem: function(item, previousItem) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.TODO_SERVER_UPDATE,
			data: { item: item, previousItem: previousItem }
		})
	},

	/**
	 * Removes a todo item
	 * 
	 * @method removeTodoItem
	 * @param {Object} item The todo item
	 */
	removeTodoItem: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.TODO_REMOVE,
			data: item
		})
	},

	/**
	 * Creates a new member
	 * 
	 * @method createMember
	 * @param {Object} item The new member
	 */
	addAttendee: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxServerConstants.ATTENDEE_ADD,
			data: item
		})
	}
};

module.exports = FluxServerActions;

