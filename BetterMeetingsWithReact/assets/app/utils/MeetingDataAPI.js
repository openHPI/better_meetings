var FluxTodoListActions = require('../actions/FluxTodoListActions');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

module.exports = {

	// Load todo-list data from server into TodoListStore via Action
	getMeetingData: function() {
		io.socket.get('', function (data, jwres) {
  			FluxAgendaActions.receiveAgenda({agenda: data.agendaItems, member: data.member, timer: data.timer});
		});
	},

	postTodo: function(data) {
		io.socket.post('/', data, function () {
  			// nyi
		});
	}
}