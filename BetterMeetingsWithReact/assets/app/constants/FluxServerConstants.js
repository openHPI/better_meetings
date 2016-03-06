var keyMirror = require('keymirror');

// Define action constants
module.exports = keyMirror({
	USER_RECEIVE: null,			// Loads user
	MEETING_RECEIVE: null,		// Loads meeting
	MEETING_START: null,		// Starts the Meeting
	TOPIC_SERVER_UPDATE: null,	// Updates a topic
	TODO_ADD: null,				// Adds item to list
	TODO_SERVER_UPDATE: null,	// Updates an item
	TODO_REMOVE: null,			// Remove item from list
	ATTENDEE_ADD: null,			// Adds mebmer to list
});