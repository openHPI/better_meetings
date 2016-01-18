var FluxAgendaActions = require('../actions/FluxAgendaActions');

module.exports = {

	// Load todo-list data from server into TodoListStore via Action
	getMeetingData: function() {
		var agenda, member, timer;

		io.socket.get('/meeting/1', function (data, jwres) {
 			agenda = data.topics;
 			member = data.member;
 			timer = data.timer;
		});

		FluxAgendaActions.receiveAgenda({agenda: agenda, member: member, timer: timer});

	},

	postTask: function(data) {
		io.socket.post('/todoitem', data, function (data, jwres) {
  			console.log(data);
		});
	},

	deleteTask: function(data) {
		io.socket.delete('/todoitem/' + data.todoItemID, function (data, jwres) {
  			console.log(data);
		});
	}
}