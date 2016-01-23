var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var FluxAgendaActions = require('../actions/FluxServerActions');

var io = sailsIOClient(socketIOClient);
var socket = io.connect();
window.socket = socket;

io.sails.url = 'http://localhost:1337';

module.exports = {

	subscribeAndListen: function() {

		io.socket.on('connect', function() {
			console.log('Connected to server');
			console.log('socket session: ' + this.id);
			// _getMeetingData();

			// Subscribe to todoitem

			io.socket.on('todoitem', function onServerSentEvent (msg) {

			    // Let's see what the server has to say...
			    switch(msg.verb) {

			        case 'created':
			        	_receiveTask(msg.data);
						break;

					case 'updated':
						_updateTask(msg.data);
						break;

					case 'destroyed':
						_destroyTask(msg.data);
						break;

			        default: 
			        	return; // ignore any unrecognized messages
			    }

			});

			io.socket.get('/todoitem', function (resData, jwres) {
				console.log('Subscribed to ' + resData);
			});

			// Subscribe to meetinggroup

			io.socket.on('meetinggroup', function onServerSentEvent (msg) {

				switch(msg.verb) {

					case 'created':
						_receiveMember(msg.data);
						break;

					case 'destroyed':
						_destroyMember(msg.data);
						break;

					default:
						return; // ignore any ...
				}
			});

			io.socket.get('/meetinggroup', function(resData, jwres) {
				console.log('Subscribed to ' +  resData);
			});

		});

		io.socket.on('disconnect', function() { 
			console.log('Lost connection to server'); 
		});

	},

	// Load todo-list data from server into TodoListStore via Action

	_getMeetingData: function() {
		var agenda, member, timer;

		io.socket.get('/meeting/1', function (data, jwres) {
 			agenda = data.topics;
 			member = data.member;
 			timer = data.timer;
		});

		FluxServerActions.receiveMeetingData({agenda: agenda, member: member, timer: timer});

	},

	// Todoitem

	_receiveTask: function(data) {
		FluxServerActions.createTask(data);
	},

	_updateTask: function(data) {
		// nyi
	},

	_destroyTask: function(data) {
		FluxServerActions.destroyTask(data);
	},

	postTask: function(data) {
		io.socket.post('/todoitem', data, function (data, jwres) {
  			console.log(data);
		});
	},

	deleteTask: function(index) {
		io.socket.delete('/todoitem/' + index, function (data, jwres) {
  			console.log(data);
		});
	},

	// Member 

	_receiveMember: function(data) {
		FluxServerActions.createMember(data);
	},

	_destroyMember: function(data) {
		FluxServerActions.destroyMember;
	},

	postMember: function(data) {
		io.socket.post('/meetinggroup/meetingguest', data, function (data, jwres) {
			console.log(data);
		});
	},

	// Test

	postUser: function(data) {
		io.socket.get('/user/create/?name=' + data.name, data, function(resData) {
			console.log(resData);
		});
	}
}