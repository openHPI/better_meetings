var React = require('react');
var MeetingDataAPI = require('./utils/MeetingDataAPI');
var FluxAdminApp = require('./components/FluxAdminApp.react');

React.render(
	<FluxAdminApp />,
	document.getElementById('flux-adminApp')
);