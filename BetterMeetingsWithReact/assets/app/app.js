/*==============================================================
=            add dependencies to render by browserify            =
==============================================================*/


window.React = require('react');
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var bsSelect = require('../js/dependencies/bootstrap-select.js');
// var nifty = require('../js/dependencies/nifty.min.js');
// var niftydemo = require('../js/dependencies/nifty-demo.js');
// var uipanels = require('../js/dependencies/ui-panels.js');
// var switchery = require('../js/dependencies/switchery.min.js');

/*==============================================
=            add app frontend logic            =
==============================================*/

var MeetingDataAPI = require('./utils/MeetingDataAPI');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');

/*===============================================================
=            assign dom elements for react rendering            =
===============================================================*/

MeetingDataAPI.subscribeAndListen();
MeetingDataAPI.getMeetingData();

React.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);

