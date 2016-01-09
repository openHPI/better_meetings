var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxAgendaConstants = require('../constants/FluxAgendaConstants');
var _ = require('underscore');

// Define initial data
var _agenda = [], _selected = null, _member = [];

// Method to load item data from MeetingDataAPI
function loadAgenda(data) {
	_agenda = data.agenda;
	_selected = data.agenda[0];
	_member = data.member;
}

// Method to set the currently selected agenda item
function setSelected(index) {
	_selected = _agenda[index];
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
			action.data.id = _selected.todoList.length.toString();
			action.data.author = "Lando";
			_selected.todoList.push(action.data);
			break;

		// Respond to TODO_REMOVE action
		case FluxAgendaConstants.TODO_REMOVE:
			if(action.data >= 0)
				_selected.todoList.splice(action.data, 1);
			break;

		// Respond to TODO_DONE action
		case FluxAgendaConstants.TODO_DONE:
			if (action.data >= 0){
				_selected.todoList_done.push(_selected.todoList[action.data]);
				_selected.todoList.splice(action.data, 1);
			}
			break;
		
		// Respond to RECEIVE_DATA action
		case FluxAgendaConstants.RECEIVE_DATA:
			loadAgenda(action.data);
			break;

		// Respond to SET_SELECTED action
		case FluxAgendaConstants.SET_SELECTED:
			if(action.data >= 0)
				setSelected(action.data);
			break;

		default:
			return true;
	}

	// If action was responded to, emit change event
	AgendaStore.emitChange();

	return true;

});

module.exports = AgendaStore;