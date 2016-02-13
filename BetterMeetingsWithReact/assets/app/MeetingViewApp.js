var React = require('react');
var MeetingDataAPI = require('./utils/MeetingDataAPI');

var FluxMeetingApp = require('./components/FluxMeetingApp.react');

MeetingDataAPI.subscribeAndListen();

React.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);