var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	TODO_CREATE: null,			// Adds item to list
	TODO_UPDATE: null,			// Updates an item
	TODO_DESTROY: null,			// Remove item from list
	MEMBER_CREATE: null,		// Adds mebmer to list
	DATA_RECEIVE: null			// Loads agenda data
});