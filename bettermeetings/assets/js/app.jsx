window.React = require('react'); 
// Das JS in Browsern beinhaltet den require-Befehl nicht, deswegen habe ich die Bib geaddet
var MeetingDataAPI = require('./utils/MeetingDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');

// Load 
TodoListServerAPI.getMeetingData();

React.render(
	'<FluxMeetingApp />',
	document.getElementById('flux-meetingApp')
);

