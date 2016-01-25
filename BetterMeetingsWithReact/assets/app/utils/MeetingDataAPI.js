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
			// _getMeetingData();

			// Subscribe to todoitem

			io.socket.on('todoitem', function onServerSentEvent (msg) {

			    // Let's see what the server has to say...
			    switch(msg.verb) {

			        case 'created':
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

			io.socket.get('/todoitem', function (resData, jwres) {});

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

			io.socket.get('/meetinggroup', function(resData, jwres) {});

			// Subscribe to person

			io.socket.get('/person/create/', function(resData, jwres) {});

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
		io.socket.post('/todoitem', data, function (resData) {
  			console.log(resData);
		});
	},

	deleteTask: function(index) {
		io.socket.delete('/todoitem/' + index, function (data, jwres) {
  			console.log(data);
		});
	},

	// Member

	postMember: function(data) {
		io.socket.post('/person/create', data, function (data, jwres) {
			console.log(jwres);
		});
	}

}