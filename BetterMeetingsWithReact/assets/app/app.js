window.React = require('react');
global.jQuery = require("jquery");
var bootstrap = require('bootstrap');
var ProductData = require('./ExampleData');
var MeetingDataAPI = require('./utils/MeetingExampleDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');

// Load Mock Product Data into localStorage
ProductData.init();

// Load
/*io.socket.on('connect', MeetingDataAPI.getMeetingData());
io.socket.on('disconnect', function(){
    console.log('Lost connection to server');
});*/
MeetingDataAPI.getMeetingData();

React.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);

