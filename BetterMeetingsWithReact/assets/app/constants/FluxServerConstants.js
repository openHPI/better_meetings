var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	TODO_ADD: null,				// Adds item to list
	TODO_SERVER_UPDATE: null,	// Updates an item
	TODO_REMOVE: null,			// Remove item from list
	ATTENDEE_ADD: null,			// Adds mebmer to list
	DATA_RECEIVE: null,			// Loads meeting data
	USER_RECEIVE: null			// Loads user
});