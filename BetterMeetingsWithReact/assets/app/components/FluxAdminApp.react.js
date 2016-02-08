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
      <div className="boxed">
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
          </div>
        </div>
      </div>
    </div>
    )
  },

  // Methode to setState based upon Store changes
  _onChange: function() {
    this.setState(getAdminState());
  }

});

module.exports = FluxAdminApp;