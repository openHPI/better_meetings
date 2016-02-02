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

			// Subscribe to todoitem

			io.socket.get('/todoitem/subscribe', function (resData, jwres) {});

			io.socket.on('todoitem', function onServerSentEvent (msg) {

			    // Let's see what the server has to say...
			    switch(msg.verb) {

			        case 'created':
			        	FluxServerActions.createTask(msg.data);
						break;

					case 'updated':
						FluxServerActions.updateTask(msg.data)
						break;

					case 'destroyed':
						FluxServerActions.destroyTask(msg.data);
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

	getMeetingData: function() {
		var id, title, agenda, member, timer;

		io.socket.get('/meeting/get', function (data, jwres) {
			id = data.meeting.id;
			title = data.meeting.title;
 			agenda = data.meeting.topics;
 			member = data.meeting.attendees;
 			timer = data.meeting.timer;
 			
 			FluxServerActions.receiveMeetingData({id: id, title: title, agenda: agenda, member: member, timer: timer});
		});

	},

	// Todoitem

	postTask: function(data) {
		console.dir(data);
		io.socket.post('/todoitem/create', data, function (data, jwres) {
  			console.dir(data);
		});
	},

	updateTask: function (data) {
		io.socket.post('/todoitem/update', data, function (data, jwres) {
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
		io.socket.post('/meeting/createAttendee', data, function (data, jwres) {
			console.dir(data);
		});
	}

}