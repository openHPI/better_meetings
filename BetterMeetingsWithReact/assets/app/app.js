window.React = require('react');
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
// var socketIO = require('../vendor/socket.io');
// var io = require('../vendor/sails.io.js/sails.io.js')(socketIO);

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var ProductData = require('./ExampleData');
var MeetingDataAPI = require('./utils/MeetingExampleDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');
// var io = require('../vendor/sails.io.js/sails.io.js');

// Load Mock Product Data into localStorage
ProductData.init();

var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';




// Load
// MeetingDataAPI.subscribeAndListen();
MeetingDataAPI.getMeetingData();

React.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);

