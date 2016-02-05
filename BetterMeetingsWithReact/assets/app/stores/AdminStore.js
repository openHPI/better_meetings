var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxAdminConstants = require('../constants/FluxAdminConstants');
var FluxServerConstants = require('../constants/FluxServerConstants');
var _ = require('underscore');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _user = null, _meetingseries = [];

// Method to load item data from MeetingDataAPI
function loadMeetingseries (data) {
  _user = 'Lando';
  _meetingseries = data.meetingseries;
}

// Extend AgendaStore with EventEmitter to add eventing capabilities
var AdminStore = _.extend({}, EventEmitter.prototype, {

  // Return agenda
  getMeetingseries: function() {
    return _meetingseries;
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
    case FluxAdminConstants.RECEIVE_ADMIN_DATA:
      loadMeetingseries(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  AdminStore.emitChange();

  return true;

});

module.exports = AdminStore;