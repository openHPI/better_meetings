var React = require('react');
var FluxAdminActions = require('../actions/FluxAdminActions');

var FluxMeetingDetails = React.createClass({

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
              <h1 className="page-header text-overflow"></h1>
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
          </div>
        </div>
        <FluxMeetingseriesForm />
      </div>
    )
  },

  // Methode to setState based upon Store changes
  _onChange: function() {
    this.setState(getAdminState());
  }

});

module.exports = FluxMeetingDetails;

module.exports = FluxMeetingDetails;