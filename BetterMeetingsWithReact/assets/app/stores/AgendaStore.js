var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');
var FluxServerConstants = require('../constants/FluxServerConstants');
var _ = require('underscore');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _user = null, _canEdit = true, _agenda = [], _selected = null, _collapsed = -1, _member = [], _meetingStatus = 0, _timer = 0;

// Method to load item data from MeetingDataAPI
function loadAgenda (data) {
	_user = 'Lando';
	_agenda = data.agenda;
	_selected = data.agenda[0];
	_member = data.member;
	_timer = data.timer;

	// getDoneItems();
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
	if(index >= 0) {
		_selected = _agenda[index];
		_collapsed = -1;
	}
}

// Method to update a Task
function updateTask (item) {
	for (var i = 0; i < _selected.todoList.length; i++) {

		if(_selected.todoList[i].id === item.id) {
			_selected.todoList[i] = item;
			if(_selected.todoList[i].done)
				markTaskAsDone(i);
		}
	};
}

// Method to mark a task as done
function markTaskAsDone (index) {
	if (index >= 0) {
		_selected.todoList[index].done = true;
		_selected.todoList_done.push(_selected.todoList[index]);
		_selected.todoList.splice(index, 1);
	}
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

	// Return agenda
	getAgenda: function() {
		return _agenda;
	},

	// Return selected agenda item
	getSelected: function() {
		return _selected;
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

		// Respond Server actions

		case FluxServerConstants.DATA_RECEIVE:
			loadAgenda(action.data);
			break;

		case FluxServerConstants.TODO_CREATE:
			_selected.todoList.push(item);
			break;

		case FluxServerConstants.TODO_UPDATE:
			updateTask(action.data);
			break;

		case FluxServerConstants.TODO_DESTROY:
			var agendaIndex = _agenda.indexOf(action.data.owner);
			var taskIndex = _agenda[agendaIndex].indexOf(action.data);
			_selected.todoList.splice(taskIndex, 1);
			break;

		case FluxServerConstants.MEMBER_CREATE:
			_member.push(member);
			break;

		// Respond Client actions

		case FluxAgendaConstants.TODO_ADD:
			action.data['owner'] = _selected;
			action.data['author'] = _user;
			MeetingDataAPI.postTask(action.data);
			break;

		case FluxAgendaConstants.TODO_REMOVE:
			MeetingDataAPI.deleteTask(action.data);
			break;

		case FluxAgendaConstants.TODO_DONE:
			action.data.done = true;
			MeetingDataAPI.updateTask(action.data);
			break;

		case FluxAgendaConstants.TODO_COLLAPSE:
			_collapsed = index;
			break;

		case FluxAgendaConstants.MEMBER_ADD:
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
