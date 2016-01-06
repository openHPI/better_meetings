var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
	TODO_ADD: null,				// Adds item to list
	TODO_REMOVE: null,			// Remove item from list
	TODO_DONE: null,			// Mark item as done
	SET_SELECTED: null,			// Selects a agenda item
	REVEICE_DATA: null			// Loads agenda data
})