var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxMeetingConstants = require('../constants/FluxMeetingConstants');

/**
 * Provides an interface of actions for the components
 * 
 * @module FluxAgendaActions
 * @require AppDispatcher
 * @require FluxMeetingConstants
 *
 */
var FluxAgendaActions = {

	/**
	 * Selects an agenda item
	 * 
	 * @method selectAgendaItem
	 * @param {Integer} index The index of the selected agenda item 
	 */
	selectTopic: function(index) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TOPIC_SELECT,
			data: index
		})
	},

	/**
	 * Selects an agenda item
	 * 
	 * @method selectAgendaItem
	 * @param {Integer} index The index of the selected agenda item 
	 */
	toggleDoneTopic: function(topic) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TOPIC_TOGGLE_DONE,
			data: topic
		})
	},

	/**
	 * Uploads and attaches a file to a topic
	 * 
	 * @method uploadFileToTopic
	 * @param {Object} member The new attendee
	 */
	uploadFileToTopic: function() {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TOPIC_UPLOAD,
			data: data
		})
	},

	/**
	 * Adds a new todo item to the todolist
	 * 
	 * @method createTodoItem
	 * @param {Object} item The new todo item 
	 */
	createTodoItem: function(item) {
		AppDispatcher.handleAction({	
			actionType: FluxMeetingConstants.TODO_CREATE,
			data: item
		})
	},

	/**
	 * Edit a todo item
	 * 
	 * @method editTodoItem
	 * @param {Object} item The todo item
	 */
	editTodoItem: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TODO_EDIT,
			data: item
		})
	},

	/**
	 * Updates a todo item
	 * 
	 * @method updateTodoItem
	 * @param {Object} item The todo item 
	 */
	updateTodoItem: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TODO_USER_UPDATE,
			data: item
		})
	},

	/**
	 * Removes a todo item from the todolist
	 * 
	 * @method destroyTodoItem
	 * @param {Integer} id The id of the 
	 */
	destroyTodoItem: function(item) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TODO_DESTROY,
			data: item
		})
	},

	swapTodoItems: function(item, item2) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.TODO_SWAP,
			data: {item: item, item2: item2}
		})
	},

	toggleAside: function () {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.ASIDE_TOGGLE
		})
	},

	/**
	 * Creates a new attendee
	 * 
	 * @method createAttendee
	 * @param {Object} member The new attendee
	 */
	createAttendee: function(person) {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.ATTENDEE_CREATE,
			data: person
		})
	},

	/**
	 * Starts the meeting
	 * 
	 * @method startMeeting
	 */
	startMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.MEETING_START
		})
	},

	/**
	 * Ends the meeting
	 * 
	 * @method endMeeting
	 */
	endMeeting: function() {
		AppDispatcher.handleAction({
			actionType: FluxMeetingConstants.MEETING_END
		})
	}
};

module.exports = FluxAgendaActions;