var React = require('react');
var ReactDOM = require('react-dom');
var MeetingDataAPI = require('./utils/MeetingDataAPI');

var FluxMeetingApp = require('./components/FluxMeetingApp.react');

MeetingDataAPI.subscribeAndListen();
MeetingDataAPI.getUser();
MeetingDataAPI.getMeetingData();

ReactDOM.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);