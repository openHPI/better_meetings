var React = require('react');
var AdminStore = require('../stores/AdminStore');
var FluxMeetingseriesList = require('./FluxMeetingseriesList.react');
var FluxMeetingseriesForm = require('./FluxMeetingseriesForm.react');

function getMeetingseriesState () {
	return {
		meetingseries: AdminStore.getMeetingseries,
	};
}

var FluxMeetingseries = React.createClass({

	// Get initial state from stores
	getInitialState: function() {
		return getMeetingState();
	},

	// Add change listeners to stores
	componentDidMount: function() {
		AdminStore.addChangeListener(this._onChange);
	},

	// Remove change listener from stores
	componentWillUnmount: function() {
		AdminStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div id="content-container">
				<div id="page-title">
	            	<h1 className="page-header text-overflow">Dashboard</h1>
	            </div>
	            <div id="page-content">
	              <div className="row">
	                <div className="col-lg-12">
	                  <FluxMeetingseriesList items={this.state.meetingseries} />
	                </div>
	              </div>
	              <div className="row">
	                <div className="col-xs-6 col-lg-3">
	                  <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#newMeetingseriesModal">New meetingseries</button>
	                </div>
	              </div>
	            </div>
	            <FluxMeetingseriesForm />
            </div>
		)
	},

	// Methode to setState based upon Store changes
	_onChange: function() {
		this.setState(getMeetingseriesState());
	}

})