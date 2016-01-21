var FluxAgendaActions = require('../actions/FluxServerActions');

module.exports = {

	// Load todo-list data from server into TodoListStore via Action
	getMeetingData: function() {
		var agenda, member, timer;

		io.socket.get('/meeting/1', function (data, jwres) {
 			agenda = data.topics;
 			member = data.member;
 			timer = data.timer;
		});

		FluxServerActions.receiveMeetingData({agenda: agenda, member: member, timer: timer});

	},

	subscribeAndListen: function() {

		io.socket.on('connect', function() {
			console.log('Connected to server');
			getMeetingData();
		});

		io.socket.on('disconnect', function() { 
			console.log('Lost connection to server'); 
		});

		io.socket.get('/todoitem', function (resData, jwres) {
			console.log('Subscribed to' + resData);
		});

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

		io.socket.get('/meetinggroup', function(resData, jwres) {
			console.log('Subscribed to ' +  resData);
		});

		io.socket.on('meetinggroup', function onServerSentEvent (msg) {

			switch(msg.verb) {

				case 'updated':
				_updateMember
				break;

				default:
					return; // ignore any ...
			}
		});
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

	_postTask: function(data) {
		io.socket.post('/todoitem', data, function (data, jwres) {
  			console.log(data);
		});
	},

	_deleteTask: function(index) {
		io.socket.delete('/todoitem/' + index, function (data, jwres) {
  			console.log(data);
		});
	},

	// Member 

	_updateMember: function(data) {
		// nyi
	}
}