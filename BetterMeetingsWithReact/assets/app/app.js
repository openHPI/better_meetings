window.React = require('react');
var ProductData = require('./ExampleData');
var MeetingDataAPI = require('./utils/MeetingExampleDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');

// Load Mock Product Data into localStorage
ProductData.init();

// Load 
MeetingDataAPI.getMeetingData();

React.render(
	<FluxMeetingApp />,
	$('#flux-meetingApp').get( 0 )
);

