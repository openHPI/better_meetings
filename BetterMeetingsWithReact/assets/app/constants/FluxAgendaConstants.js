var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	TODO_ADD: null,				// Adds item to list
	TODO_REMOVE: null,			// Remove item from list
	TODO_DONE: null,			// Mark item as done
	MEMBER_PRESENT: null,		// Mark Member as present
	MEMBER_ABSENT: null,		// Mark Member as absent
	SET_SELECTED: null,			// Selects a agenda item
	REVEICE_DATA: null			// Loads agenda data
})