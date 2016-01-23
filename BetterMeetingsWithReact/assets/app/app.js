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

		io.socket.get('/user/create/');
		io.socket.on('user', function(user) {
                     console.log('Daten-Inventur: ' + JSON.parse(JSON.stringify(user)));
                     console.dir(user);
                     receiveUserDataFromServer(user);
                  });

	});




window.socket = socket;

function receiveUserDataFromServer(user) {

	console.log('Neuer User: ' + user);

         var newUserName = user.name;

         updateUserListInDom(newUserName,user);


}

function updateUserListInDom (newUserName,user) {
   var page = document.location.pathname;
   console.log('Paging aktiv');
   page = page.replace(/(\/)$/, '');

   switch (page) {
      case '/user':

         if (user.verb === 'created') {
            AttendeesBlock.addItemToList(newUserName, user);
         }
         // BM-Team: Destroy habe ich nch nicht  richtig umgesetzt, ist aber nur ein Fromsache
         if (user.verb === 'destroy') {
            AttendeesBlock.updateList(newUserName, user);
         }
         break;
   }
}

var AttendeesBlock = {

   addItemToList: function(name, user) {
      console.log('Bauarbeiter aktiv');
      var data = user.data;
      jQuery('#user-list').append('<li>'+ data.name + ' Test</li>');
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

