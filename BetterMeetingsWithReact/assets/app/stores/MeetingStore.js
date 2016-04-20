var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxMeetingConstants = require('../constants/FluxMeetingConstants');
var FluxServerConstants = require('../constants/FluxServerConstants');
var _ = require('underscore');
var MeetingDataAPI = require('../utils/MeetingDataAPI');

// Define initial data
var _isMeetingDataLoaded = false, _isMeetingDone = false, _user = null, _meeting = null, _canEdit = false, _selectedTopic = 0, _allTodoItems = [], _editingTodoItem = null, _qrcode = null, _options = [];

/**
 * Setting the user
 *
 * @method loadUserData
 * @param {Object} data The user data
 */
function loadUserData(user) {
  _user = user;
  console.log(_user);
}

/**
 * Initializing the agenda store variables
 *
 * @method loadMeetingData
 * @param {Object} data The meeting data
 */
function loadMeetingData(meeting) {
  _isMeetingDataLoaded = true;
  _meeting = meeting;
  _selectedTopic = 0;
  _allTodoItems = getAllTodoItems();
  _canEdit = isUserAdmin();
}

/**
 * Fetching all todo item from the topics
 *
 * @method getAllTodoItems
 * @return {Array<Objects>} allTodoItems All todo items
 */
function getAllTodoItems() {
  var allTodoItems = [];
  for (var i = 0; i < _meeting.topics.length; i++) {
    allTodoItems = allTodoItems.concat(_meeting.topics[i].todos);
  }

  return allTodoItems;
}

function updateTopic(topic) {
  for (var i = 0; i < _meeting.topics.length; i++) {
    if (_meeting.topics[i].id === topic.id) {
      _meeting.topics[i] === topic;
      return;
    }
  }
}

function isUserAdmin() {
  for (var i = 0; i < _meeting.admins.length; i++) {
    if (_user.id === _meeting.admins[i].id)
      return true;
  }
  return false;
}

function getIndexOfTodoItem(item, todoitems) {
  for (var i = 0; i < todoitems.length; i++) {
    if (todoitems[i].id === item.id)
      return i;
  }
}

/**
 * Updates a todo item
 *
 * @method updateTodoItem
 * @param {Object} item Updated todo item
 * @param {Object} previousItem Old todo item
 */
function updateTodoItem(item) {

  var index;

  for (var i = 0; i < _meeting.topics.length; i++) {
    if (_meeting.topics[i].id === item.owner) {
      index = getIndexOfTodoItem(item, _meeting.topics[i].todos);
      _meeting.topics[i].todos[index] = item;
      break;
    }
  }

  index = getIndexOfTodoItem(item, _allTodoItems);
  _allTodoItems[index] = item;
}

/**
 * Destroys a todo item
 *
 * @method removeTodoItem
 * @param {Object} item The todo item
 */
function removeTodoItem(item) {

  var index;

  for (var i = 0; i < _meeting.topics.length; i++) {
    if (_meeting.topics[i].id === item.owner) {
      index = getIndexOfTodoItem(item, _meeting.topics[i].todos);
      _meeting.topics[i].todos.splice(index, 1);
      break;
    }
  }

  index = getIndexOfTodoItem(item, _allTodoItems);
  _allTodoItems.splice(index, 1);
}

function generateAssigneeOptions() {
  var options = [];
  var persons = _meeting.admins.concat(_meeting.members, _meeting.attendees);
  var uniqPersons = [];

  for (var i = 0; i < persons.length; i++)
    uniqPersons[persons[i]['id']] = persons[i];

  persons = new Array();
  for (var key in uniqPersons)
    persons.push(uniqPersons[key]);

  console.log(persons);

  for (var i = 0; i < persons.length; i++) {
    options.push({ value: persons[i].email, label: persons[i].name + " (" + persons[i].email + ")" });
  }

  _options = options;
}

/**
 * Handles the actions for the meeting
 *
 * @module MeetingStore
 */
var MeetingStore = _.extend({}, EventEmitter.prototype, {

  getUser: function () {
    return _user;
  },

  canEdit: function () {
    return _canEdit;
  },

  getIsMeetingDataLoaded: function () {
    return _isMeetingDataLoaded;
  },

  getIsMeetingDone: function () {
    return _isMeetingDone;
  },

  getMeetingData: function () {
    return _meeting;
  },

  getQrCode: function () {
    return _qrcode;
  },

  getAssigneeOptions: function () {
    return _options;
  },

  // Return selected agenda item
  getSelectedTopic: function () {
    return _selectedTopic;
  },

  // Return all todos
  getAllTodoItems: function () {
    return _allTodoItems;
  },

  getEditingTodoItem: function () {
    return _editingTodoItem;
  },

  // Emit change event
  emitChange: function () {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;

  switch (action.actionType) {

    // Respond to server actions

    case FluxServerConstants.USER_RECEIVE:
      loadUserData(action.data);
      break;

    case FluxServerConstants.MEETING_RECEIVE:
      loadMeetingData(action.data.meeting);
      _qrcode = action.data.qrcode;
      _meeting['members'] = action.data.members;
      generateAssigneeOptions();
      MeetingDataAPI.subscribeAndListen(_meeting.topics, _allTodoItems);
      break;

    case FluxServerConstants.TOPIC_SERVER_UPDATE:
      updateTopic(action.data.item);
      break;

    case FluxServerConstants.TODO_ADD:
      addTodoItem(action.data);
      _meeting.topics[_selectedTopic].todos.unshift(action.data);
      _allTodoItems.unshift(action.data);
      break;

    case FluxServerConstants.TODO_SERVER_UPDATE:
      updateTodoItem(action.data);
      break;

    case FluxServerConstants.TODO_REMOVE:
      removeTodoItem(action.data);
      break;

    case FluxServerConstants.ATTENDEE_ADD:
      _meeting.attendees.push(action.data);
      generateAssigneeOptions();
      break;

    // Respond to client actions

    case FluxMeetingConstants.TODO_CREATE:
      action.data.owner = _meeting.topics[_selectedTopic].id;
      action.data.author = _user.id;
      MeetingDataAPI.createTodoItem(action.data);
      break;

    case FluxMeetingConstants.TODO_EDIT:
      _editingTodoItem = action.data;
      break;

    case FluxMeetingConstants.TODO_USER_UPDATE:
      MeetingDataAPI.updateTodoItem(action.data);
      break;

    case FluxMeetingConstants.TODO_DESTROY:
      MeetingDataAPI.destroyTodoItem(action.data);
      break;

    case FluxMeetingConstants.TODO_SWAP:
      console.log("swappint from: " + action.data.item + "to: " + action.data.item2);
      var temp = _meeting.topics[_selectedTopic].todos[action.data.item];
      _meeting.topics[_selectedTopic].todos[action.data.item1] = _meeting.topics[_selectedTopic].todos[action.data.item2];
      _meeting.topics[_selectedTopic].todos[action.data.item2] = temp;
      break;

    case FluxMeetingConstants.ASIDE_TOGGLE:
      console.log('toggle Aside');
      $.niftyAside('toggleHideShow');
      break;

    case FluxMeetingConstants.ATTENDEE_CREATE:
      console.dir(action.data);
      action.data.id = _meeting.id;
      MeetingDataAPI.createAttendee(action.data);
      break;

    case FluxMeetingConstants.TOPIC_SELECT:
      _selectedTopic = action.data;
      _editingTodoItem = -1;
      break;

    case FluxMeetingConstants.TOPIC_TOGGLE_DONE:
      action.data.done = !action.data.done;
      MeetingDataAPI.updateTopic(action.data);
      break;

    case FluxMeetingConstants.TOPIC_UPLOAD:
      MeetingDataAPI.attachFileToTopic(action.data);
      break;

    case FluxMeetingConstants.MEETING_START:
      break;

    case FluxMeetingConstants.MEETING_END:
      _isMeetingDone = true;
      MeetingDataAPI.endMeeting(_meeting);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  MeetingStore.emitChange();

  return true;

});

module.exports = MeetingStore;
