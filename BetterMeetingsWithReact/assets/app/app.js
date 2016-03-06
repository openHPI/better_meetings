/*==============================================================
=            add dependencies to render by browserify            =
==============================================================*/


var React = require('react');
var ReactDOM = require('react-dom');
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
var MeetingStore = require('./stores/MeetingStore');
var FluxMeetingApp = require('./components/FluxMeetingApp.react');

/*===============================================================
=            assign dom elements for react rendering            =
===============================================================*/

MeetingDataAPI.getUser();
MeetingDataAPI.getMeetingData();

var todoitemList = MeetingStore.getAllTodoItems();

MeetingDataAPI.subscribeAndListen(todoitemList);

ReactDOM.render(
	<FluxMeetingApp />,
	document.getElementById('flux-meetingApp')
);

