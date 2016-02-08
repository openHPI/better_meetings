var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');
var FluxServerConstants = require('../constants/FluxServerConstants');
var _ = require('underscore');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _user = null, _canEdit = true, _id = null, _title = null, _agenda = [], _selected = null, _allTodos = [], _collapsed = -1, _member = [], _meetingStatus = 0, _timer = null;

// Method to load item data from MeetingDataAPI
function loadAgenda (data) {

	_user = 'Lando';
	_id = data.id;
	_title = data.title;
	_agenda = data.agenda;
	_selected = data.agenda[0];
	_allTodos = getAllTodos();
	_member = data.member;
	_timer = data.timer;
}

// Method to get All todos
function getAllTodos () {
	var allTodos = [];
	for (var i = 0; i < _agenda.length; i++) {

		allTodos = allTodos.concat(_agenda[i].todos);

	}
	return allTodos;
}

// Method to set the currently selected agenda item
function setSelected (index) {
	if(index >= 0) {
		_selected = _agenda[index];
		_collapsed = -1;
	}
}

function updateTask (item, previousItem) {

	var index;

	for (var i = 0; i < _agenda.length; i++) {
		if( _agenda[i].id === previousItem.owner ){
			index = _agenda[i].todos.indexOf(previousItem);
			_agenda[i].todos[index] = item;
			break;
		}
	}

	index = allTodos.indexOf(previousItem);
	_allTodos[index] = item;
}

function deleteTask (item) {
	var index;

	for (var i = 0; i < _agenda.length; i++) {
		if( _agenda[i].id === previousItem.owner ){
			index = _agenda[i].todos.indexOf(previousItem);
			_agenda[i].todos.splice(index, 1);
			break;
		}
	}

	index = allTodos.indexOf(previousItem);
	_allTodos.splice(index, 1);
}

// Extend AgendaStore with EventEmitter to add eventing capabilities
var AgendaStore = _.extend({}, EventEmitter.prototype, {

	getUser: function() {
		return _user;
	},

	// Return boolean if Client can edit
	getCanEdit: function() {
		return _canEdit;
	},

	getTitle: function() {
		return _title;
	},

	// Return agenda
	getAgenda: function() {
		return _agenda;
	},

	// Return selected agenda item
	getSelected: function() {
		return _selected;
	},

	// Return all todos
	getAllTodoItems: function() {
		return _allTodos;
	},

	// Return collapsed index of todoitem
	getCollapsed: function() {
		return _collapsed;
	},

	// Return member
	getMember: function() {
		return _member;
	},

	// Return hasStarted
	getMeetingStatus: function() {
		return _meetingStatus;
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

		// Respond to server actions

		case FluxServerConstants.DATA_RECEIVE:
			loadAgenda(action.data);
			break;

		case FluxServerConstants.TODO_CREATE:
			_selected.todos.unshift(action.data);
			break;

		case FluxServerConstants.TODO_UPDATE:
			updateTask(action.data.item, action.data.previousItem);
			break;

		case FluxServerConstants.TODO_DESTROY:
			deleteTask(action.data);
			break;

		case FluxServerConstants.MEMBER_CREATE:
			_member.push(action.data);
			break;

		// Respond to client actions

		case FluxAgendaConstants.TODO_ADD:
			action.data.owner = _selected.id;
			action.data.author = 1;
			MeetingDataAPI.postTask(action.data);
			break;

		case FluxAgendaConstants.TODO_REMOVE:
			MeetingDataAPI.deleteTask(action.data);
			break;

		case FluxAgendaConstants.TODO_TOGGLE_DONE:
			action.data.done = !action.data.done;
			MeetingDataAPI.updateTask(action.data);
			break;

		case FluxAgendaConstants.TODO_COLLAPSE:
			_collapsed = (action.data);
			break;

		case FluxAgendaConstants.MEMBER_ADD:
			action.data.id = _id;
			MeetingDataAPI.postMember(action.data);
			break;

		case FluxAgendaConstants.RECEIVE_DATA:
			loadAgenda(action.data);
			break;

		case FluxAgendaConstants.SET_SELECTED:
			setSelected(action.data);
			break;

		case FluxAgendaConstants.MEETING_START:
			_meetingStatus = 1;
			break;

		case FluxAgendaConstants.MEETING_END:
			_meetingStatus = 2;
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	AgendaStore.emitChange();

	return true;

});

module.exports = AgendaStore;
