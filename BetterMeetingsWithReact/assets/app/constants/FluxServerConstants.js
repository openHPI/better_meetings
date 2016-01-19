var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	MEETING_START: null,		// Starts the Meeting
	TODO_CREATE: null,			// Adds item to list
	TODO_DESTROY: null,			// Remove item from list
	DATA_RECEIVE: null			// Loads agenda data
});