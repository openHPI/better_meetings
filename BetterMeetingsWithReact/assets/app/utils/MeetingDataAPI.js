var FluxTodoListActions = require('../actions/FluxTodoListActions');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

module.exports = {

	// Load todo-list data from server into TodoListStore via Action
	getMeetingData: function() {
		var meetingData;
		var jqxhr = $.ajax({
			//method: "GET",
			url: "../exampleData.json",
			dataType: "json"
		})
		.done(function(data) {
		    meetingData = data;
		})
		.fail(function() {
		    alert( "error" );
		})
		.always(function() {
		    alert( "complete" );
		});
		FluxTodoListActions.receiveTodoListItems(meetingData.todoListItems);
		FluxAgendaActions.receiveAgendaItems(meeingData.agendaItems);
	}
}