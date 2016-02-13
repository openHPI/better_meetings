var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	MEETING_END: null,			// Ends the Meeting
	TODO_CREATE: null,			// Create a new todo item
	TODO_DESTROY: null,			// Destroy a todo
	TODO_TOGGLE_DONE: null,		// 
	TODO_COLLAPSE: null,		// Collapse item 
	ATTENDEE_CREATE: null,		// Adds a member to membergroup
	SET_SELECTED: null,			// Selects a agenda item
});