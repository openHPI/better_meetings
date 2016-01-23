var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	MEETING_END: null,			// Ends the Meeting
	TODO_ADD: null,				// Adds item to list
	TODO_REMOVE: null,			// Remove item from list
	TODO_DONE: null,			// Mark item as done
	TODO_COLLAPSE: null,		// 
	MEMBER_ADD: null,			// Adds a member to membergroup
	SET_SELECTED: null,			// Selects a agenda item
	REVEICE_DATA: null			// Loads agenda data
})