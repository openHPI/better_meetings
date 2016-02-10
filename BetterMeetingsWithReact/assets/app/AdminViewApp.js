var React = require('react');
var Router = require('react-router/modules/Router');
var Route = require('react-router/modules/Route');
var browserHistory = require('react-router/modules/browserHistory');
var MeetingDataAPI = require('./utils/MeetingDataAPI');
var FluxAdminApp = require('./components/FluxAdminApp.react');
var FluxMeetingseries = require('./components/FluxMeetingseries.react');
var FluxMeetingseriesDetails = require('./components/FluxMeetingseriesDetails');

React.render((
	<Router history={browserHistory} >
		<Route path="/" component={FluxAdminApp}>
			<Route path="/meetingseries" component={FluxMeetingseries} />
			<Route path="/meetingseries/:meetingseriesId" component={FluxMeetingseriesDetails} />
		</Route>
	</Router>
	), document.getElementById('flux-adminApp')
);