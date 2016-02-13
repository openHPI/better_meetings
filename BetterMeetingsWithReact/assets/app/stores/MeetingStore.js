var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxMeetingConstants = require('../constants/FluxMeetingConstants');
var FluxServerConstants = require('../constants/FluxServerConstants');
var _ = require('underscore');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _user = null, _meetingId = null, _meetingTitle = null, _meetingTopics = [], _selectedTopic = null, _allTodoItems = [], _collapsedTodoItem = -1, _meetingAttendees = [], _meetingStatus = 0, _meetingTimer = null;

/**
 * Initializing the agenda store variables
 * 
 * @method loadMeetingData
 * @param {Object} data The meeting data
 */
function loadMeetingData (data) {
	_meetingId = data.id;
	_meetingTitle = data.title;
	_meetingTopics = data.agenda;
	_selectedTopic = data.agenda[0];
	_allTodoItems = getAllTodoItems();
	_meetingAttendees = data.attendees;
	_meetingTimer = data.timer;
}

/**
 * Setting the user
 * 
 * @method loadUserData
 * @param {Object} data The user data
 */
function loadUserData (data) {
	_user = data;
}

/**
 * Fetching all todo item from the topics
 * 
 * @method getAllTodoItems
 * @return {Array<Objects>} allTodoItems All todo items
 */
function getAllTodoItems () {
	var allTodoItems = [];
	for (var i = 0; i < _meetingTopics.length; i++) {
		allTodoItems = allTodoItems.concat(_meetingTopics[i].todos);
	}

	return allTodoItems;
}

/**
 * Sets the selected topic
 * 
 * @method setSelectedTopic
 * @param {Integer} index The index of the topic
 */
function setSelectedTopic (index) {
	if(index >= 0) {
		_selectedTopic = _meetingTopics[index];
		_collapsedTodoItem = -1;
	}
}

/**
 * Updates a todo item
 * 
 * @method updateTodoItem
 * @param {Object} item Updated todo item
 * @param {Object} previousItem Old todo item
 */
function updateTodoItem (item, previousItem) {

	var index;

	for (var i = 0; i < _meetingTopics.length; i++) {
		if( _meetingTopics[i].id === previousItem.owner ){
			index = _meetingTopics[i].todos.indexOf(previousItem);
			_meetingTopics[i].todos[index] = item;
			break;
		}
	}

	index = allTodoItems.indexOf(previousItem);
	_allTodoItems[index] = item;
}

/**
 * Destroys a todo item
 * 
 * @method removeTodoItem
 * @param {Object} item The todo item
 */
function removeTodoItem (item) {
	var index;

	for (var i = 0; i < _meetingTopics.length; i++) {
		if( _meetingTopics[i].id === previousItem.owner ){
			index = _meetingTopics[i].todos.indexOf(previousItem);
			_meetingTopics[i].todos.splice(index, 1);
			break;
		}
	}

	index = allTodoItems.indexOf(previousItem);
	_allTodoItems.splice(index, 1);
}

/**
 * Handles the actions for the meeting
 *
 * @module MeetingStore
 */
var MeetingStore = _.extend({}, EventEmitter.prototype, {

	getUser: function() {
		return _user;
	},

	getTitle: function() {
		return _meetingTitle;
	},

	// Return agenda
	getTopics: function() {
		return _meetingTopics;
	},

	// Return selected agenda item
	getSelectedTopic: function() {
		return _selectedTopic;
	},

	// Return all todos
	getAllTodoItems: function() {
		return _allTodoItems;
	},

	// Return collapsed index of todoitem
	getCollapsedTodoItem: function() {
		return _collapsedTodoItem;
	},

	// Return attendees
	getAttendees: function() {
		return _meetingAttendees;
	},

	// Return hasStarted
	getMeetingStatus: function() {
		return _meetingStatus;
	},

	// Return timer
	getTimer: function() {
		return _meetingTimer;
	},

	// Return index of selected Agenda Item
	getTopicIndex: function() {
		return _meetingTopics.indexOf(_selectedTopic);
	},

	// Emit change event
	emitChange: function() {
		this.emit('change');
	},

	// Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	// Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;
	var text;

	switch(action.actionType) {

		// Respond to server actions

		case FluxServerConstants.DATA_RECEIVE:
			loadMeetingData(action.data);
			break;

		case FluxServerConstants.TODO_ADD:
			_selectedTopic.todos.unshift(action.data);
			break;

		case FluxServerConstants.TODO_UPDATE:
			updateTodoItem(action.data.item, action.data.previousItem);
			break;

		case FluxServerConstants.TODO_REMOVE:
			removeTodoItem(action.data);
			break;

		case FluxServerConstants.ATTENDEE_ADD:
			_meetingAttendees.push(action.data);
			break;

		// Respond to client actions

		case FluxMeetingConstants.TODO_CREATE:
			action.data.owner = _selectedTopic.id;
			action.data.author = _user.id;
			MeetingDataAPI.createTodoItem(action.data);
			break;

		case FluxMeetingConstants.TODO_REMOVE:
			MeetingDataAPI.destroyTodoItem(action.data);
			break;

		case FluxMeetingConstants.TODO_TOGGLE_DONE:
			action.data.done = !action.data.done;
			MeetingDataAPI.updateTodoItem(action.data);
			break;

		case FluxMeetingConstants.TODO_COLLAPSE:
			_collapsedTodoItem = (action.data);
			break;

		case FluxMeetingConstants.attendees_ADD:
			action.data.id = _meetingId;
			MeetingDataAPI.createAttendee(action.data);
			break;

		case FluxMeetingConstants.SET_SELECTED:
			setSelectedTopic(action.data);
			break;

		case FluxMeetingConstants.MEETING_START:
			_meetingStatus = 1;
			break;

		case FluxMeetingConstants.MEETING_END:
			_meetingStatus = 2;
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	MeetingStore.emitChange();

	return true;

});

module.exports = MeetingStore;
