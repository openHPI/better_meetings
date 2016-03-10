var keyMirror = require('keymirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	MEETING_END: null,			// Ends the Meeting
	TODO_CREATE: null,			// Create a new todo item
	TODO_EDIT: null,			// Change a todo item
	TODO_USER_UPDATE: null,		// Updates a todo item
	TODO_DESTROY: null,			// Destroy a todo item
	TODO_SWAP: null,			// Sorts todolist
	ASIDE_TOGGLE: null,			// Toggle aside
	ATTENDEE_CREATE: null,		// Adds a member to membergroup
	TOPIC_SELECT: null,			// Selects a agenda item
	TOPIC_TOGGLE_DONE: null,	// Toggles done state fo topic
});