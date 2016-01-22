/*==============================================================
=            add components to render by browserify            =
==============================================================*/


window.React = require('react');
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var ProductData = require('./ExampleData');
var MeetingDataAPI = require('./utils/MeetingExampleDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');


// Load Mock Product Data into localStorage
ProductData.init();

/*==============================================================
=            do socket connect and basic behaviours            =
==============================================================*/

var io = sailsIOClient(socketIOClient);
var socket = io.connect();

	io.sails.url = 'http://localhost:1337';

	if (typeof console != 'undefined') {
		console.log('Connecting to Sails');
	}

	io.socket.on('connect', function socketConnected() {
		console.log('socket session: ' + this.id);

		io.socket.get('/user/create');
		io.socket.on('user', receiveUserDataFromServer);
	})
	

window.socket = socket;

function receiveUserDataFromServer(user) {

	console.log('Neuer User: ' + user);

	if (user.model === 'user') {
		$('#user-list').append('<li>'+ user.name + ' (' + user.userID + ')</li>');
	}
}


/*===============================================================
=            assign dom elements for react rendering            =
===============================================================*/

MeetingDataAPI.getMeetingData();

React.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);

