var CONST_ES6_BUILD_PATH = './build/';
var _  = require('lodash');
var io = require('../vendor/sails.io.js/sails.io.js')();
//var React = require('react');
$ = jQuery = require('jquery');
var bootstrap = require('../vendor/bootstrap/dist/js/bootstrap.min.js')

window.React = require('../vendor/react/react.min.js');
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


