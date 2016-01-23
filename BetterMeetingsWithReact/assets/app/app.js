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
		io.socket.on('message', receiveUserDataFromServer);

	});

         io.socket.get('/users/viewAll', function poulateList(items) {
            console.log(items);
         });


window.socket = socket;

function receiveUserDataFromServer(message) {

	console.log('Neuer User: ' + message);

         var newUserName = message.name;

         updateUserListInDom(newUserName,message);


}

function updateUserListInDom (newUserName,message) {
   var page = document.location.pathname;

   page = page.replace(/(\/)$/, '');

   switch (page) {
      case '/user':

         if (message.verb === 'update') {
            AttendeesBlock.updateList(newUserName, message);
         }
         break;
   }
}

var AttendeesBlock = {

   updateList: function(name, message) {
      $('#user-list').append('<li>'+ name + ' </li>');
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

