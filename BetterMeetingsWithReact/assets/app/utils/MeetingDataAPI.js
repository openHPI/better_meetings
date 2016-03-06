var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var FluxServerActions = require('../actions/FluxServerActions');

var io = sailsIOClient(socketIOClient);
var socket = io.connect();
window.socket = socket;

io.sails.url = 'http://localhost:1337';

/**
 * Provides an interface for server interaction
 *
 * @module MeetingDataAPI
 * @require socket.io-client
 * @require sails.io
 * @require FluxServerActions
 */
module.exports = {


  /**
   * Subscribes und listen to the modules 'todoitem' and 'person'
   *
   * @method subscribeAndListen
   */
  subscribeAndListen: function (todoitemList) {

    io.socket.on('connect', function () {
      console.log('Connected to server');
      console.log('Socket session: ' + this.id);

      // Subscribe to todoitem

      io.socket.get('/todoitem/listen', todoitemList, function (resData, jwres) {});

      io.socket.on('todoitem', function onServerSentEvent(msg) {

        switch (msg.verb) {

          case 'created':
            console.log('Created Todoitem' + msg.data);
            FluxServerActions.addTodoItem(msg.data);
            break;

          case 'updated':
            console.log('PUBSUB: Updated TodoItem: ' + msg.data);
            FluxServerActions.updateTodoItem(msg.data, msg.id);
            break;

          case 'destroyed':
            console.log('PUBSUB: Delete Todoitem: ' + msg.previous);
            FluxServerActions.removeTodoItem(msg.previous);
            break;

          default:
            console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
            return;
        }

      });

      // Subscribe to person

      io.socket.get('/person/listen', function (resData, jwres) {});

      io.socket.on('person', function (msg) {

        switch (msg.verb) {

          case 'created':
            FluxServerActions.createMember(msg.data);
            break;

          default:
            console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
            return;
        }
      });

    });

    io.socket.on('disconnect', function () {
      console.log('Lost connection to server');
    });

  },

  /**
   * Sends a GET-request to the server for getting the meeting data and stores them into the MeetingStore
   *
   * @method getMeetingData
   */
  getMeetingData: function () {

    io.socket.get('/meeting/get', function (data, jwres) {
      FluxServerActions.receiveMeetingData(data.meeting);
    });

  },

  getUser: function() {
    io.socket.get('/person/current', function (data, jwres) {
      FluxServerActions.receiveUser(data.user);
    });
  },

  // Todoitem

  /**
   * Sends a POST-request to the server for creating a new todo item
   *
   * @method postTask
   * @param {Object} data The new todo item
   */
  createTodoItem: function (data) {
    io.socket.post('/todoitem/create', data, function (data, jwres) {});
  },

  /**
   * Sends a POST-request to the server for updating a todo item
   *
   * @method updateTask
   * @param {Object} data The todo item
   */
  updateTodoItem: function (data) {
    io.socket.post('/todoitem/update', data, function (data, jwres) {});
  },

  /**
   * Sends a POST-request to the server for deleting a todo item
   *
   * @method deleteTask
   * @param {Integer} id The id of the todo item
   */
  destroyTodoItem: function (data) {
    io.socket.post('/todoitem/delete', data, function (data, jwres) {});
  },

  // Member

  /**
   * Sends a POST-request to the server for creating a new member and adding the member to the meeting attendees
   *
   * @method postMember
   * @param {Object} data The new member
   */
  createAttendee: function (data) {
    io.socket.post('/meeting/createAttendee', data, function (data, jwres) {});
  },

  /**
   * Sends a POST-request to the server for uploading a document and attaching it to an agendaItem
   *
   * @method attachFileToTopic
   * @param {Object} data The new member
   */
  attachFileToTopic: function () {
     io.socket.post();
  },

  updateTopic: function(data) {
    io.socket.post('/agendaitem/update', data, function(data, jwres) {});
  },

  /**
   * Sends a GET-request to the server to end the meeting
   *
   * @method endMeeting
   */
  endMeeting: function (id) {
    io.socket.get('/meeting/end', id, function (data, jwres) {});
  }

}
