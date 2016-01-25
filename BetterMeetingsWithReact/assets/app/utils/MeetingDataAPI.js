var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var FluxServerActions = require('../actions/FluxServerActions');

var io = sailsIOClient(socketIOClient);
var socket = io.connect();
window.socket = socket;

io.sails.url = 'http://localhost:1337';

module.exports = {

	subscribeAndListen: function() {

		io.socket.on('connect', function() {
			console.log('Connected to server');
			console.log('socket session: ' + this.id);
			// this._getMeetingData();

			// Subscribe to todoitem

			io.socket.get('/todoitem/subscribe', function (resData, jwres) {});

			io.socket.on('todoitem', function onServerSentEvent (msg) {

			    // Let's see what the server has to say...
			    switch(msg.verb) {

			        case 'created':
			        	console.log('create todoitem');
			        	FluxServerActions.createTask(data);
						break;

					case 'updated':
						_updateTask(msg.data);
						break;

					case 'destroyed':
						FluxServerActions.destroyTask(data);
						break;

			        default:
			        	return; // ignore any unrecognized messages
			    }

			});

			// Subscribe to person

			io.socket.get('/person/subscribe', function(resData, jwres) {});

            io.socket.on('person', function (msg) {

                switch(msg.verb) {

                	case 'created':
                    	FluxServerActions.createMember(msg.data);
                    	break;

                	case 'destroyed':
                    	_destroyMember(msg.data);
                		break;

                	default:
                    	return; // ignore any ...
                }
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

	postTask: function(data) {
		io.socket.post('/todoitem/create', data, function (data, jwres) {
  			console.dir(data);
		});
	},

	deleteTask: function(index) {
		io.socket.post('/todoitem/delete', index, function (data, jwres) {
			console.log('Deleted item ' + index);
		});
	},

	// Member

	postMember: function(data) {
		io.socket.post('/person/create', data, function (data, jwres) {
			console.dir(data);
		});
	}

}