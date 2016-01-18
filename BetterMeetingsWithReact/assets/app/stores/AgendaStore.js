var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');
var _ = require('underscore');
// var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _agenda = [], _selected = null, _member = [], _hasStarted = false, _timer = 0;

// Method to load item data from MeetingDataAPI
function loadAgenda (data) {
	_agenda = data.agenda;
	_selected = data.agenda[0];
	_member = data.member;
	_timer = data.timer;

	getDoneItems();
}

// Method to create the _selected.todoList_done
function getDoneItems () {
	for (var i = 0; i < _agenda.length; i++) {
		
		_agenda[i]['todoList_done'] = [];

		for (var j = 0; j < _agenda[i].todoList.length; j++) {
			if(_agenda[i].todoList[j].done)
				_agenda[i].todoList_done.push(_agenda[i].todoList[j]);
		}
	}
}

// Method to set the currently selected agenda item
function setSelected (index) {
	if(index >= 0)
		_selected = _agenda[index];
}

// Method to add a task to the todoList
function addTask (item) {
	item.id = _selected.todoList.length.toString();
	item.author = "Lando";
	_selected.todoList.push(item);	
}

// Method to remove a task from the todoList
function removeTask (index) {
	if(index >= 0)
		_selected.todoList.splice(index, 1);
}

// Method to mark a task as done
function markTaskAsDone (index) {
	if (index >= 0){
		_selected.todoList[index].done = true;
		_selected.todoList_done.push(_selected.todoList[index]);
		_selected.todoList.splice(index, 1);
	}
}

// Method to start the meeting
function startMeeting (data) {
	_hasStarted = true;
}

// Extend AgendaStore with EventEmitter to add eventing capabilities
var AgendaStore = _.extend({}, EventEmitter.prototype, {
	// Return agenda
	getAgenda: function() {
		return _agenda;
	},

	// Return selected agenda item
	getSelected: function() {
		return _selected;
	},

	// Return member
	getMember: function() {
		return _member;
	},

	// Return hasStarted
	hasStarted: function() {
		return _hasStarted;
	},

	// Return timer
	getTimer: function() {
		return _timer;
	},

	// Return number of Agenda Items
	getAgendaTotal: function() {
		return _agenda.length;
	},

	// Return index of selected Agenda Item
	getAgendaIndex: function() {
		return _agenda.indexOf(_selected);
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

		// Respond to TODO_ADD action
		case FluxAgendaConstants.TODO_ADD:
			addTask(action.data);
			// MeetingDataAPI.postTodo(action.data);
			break;

		// Respond to TODO_REMOVE action
		case FluxAgendaConstants.TODO_REMOVE:
			removeTask(action.data);
			break;

		// Respond to TODO_DONE action
		case FluxAgendaConstants.TODO_DONE:
			markTaskAsDone(action.data);
			break;

		// Respond to MEMBER_PRESENT
		case FluxAgendaConstants.MEMBER_PRESENT:
			_member[action.data]['status'] = 'present';
			break;

		// Respond to MEMBER_ABSENT
		case FluxAgendaConstants.MEMBER_ABSENT:
			_member[action.data]['status'] = 'absent';
			break;
		
		// Respond to RECEIVE_DATA action
		case FluxAgendaConstants.RECEIVE_DATA:
			loadAgenda(action.data);
			break;

		// Respond to SET_SELECTED action
		case FluxAgendaConstants.SET_SELECTED:
			setSelected(action.data);
			break;

		// Respond to MEETING_START
		case FluxAgendaConstants.MEETING_START:
			startMeeting();
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	AgendaStore.emitChange();

	return true;

});

module.exports = AgendaStore;