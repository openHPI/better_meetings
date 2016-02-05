var React = require('react');
var AdminStore = require('../stores/AdminStore');
var FluxMeetingseriesList = require('./FluxMeetingseriesList.react');

function getAdminState () {
  return {
    meetingseries: AdminStore.getMeetingseries()
  }
}

var FluxAdminApp = React.createClass({

  getInitialState: function() {
    return getAdminState();
  },

  componentDidMount: function() {
    AdminStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
    <div className="container">
      <FluxMeetingseriesList items={this.state.meetingseries} />
    </div>
    )
  },

  // Methode to setState based upon Store changes
  _onChange: function() {
    this.setState(getAdminState());
  }

});

module.exports = FluxAdminApp;