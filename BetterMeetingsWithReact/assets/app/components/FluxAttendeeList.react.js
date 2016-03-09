var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');
var FluxAttendeeItem = require('./FluxAttendeeItem.react');

/**
 * FluxAttendeeList
 *
 * @module FluxAttendeeList
 * @require React
 * @require FluxAttendeeItem
 *
 */
var FluxAttendeeList = React.createClass({

    getInitialState: function() {
      return {name: '', email: ''};
    },

    handleNameChanges: function(event) {
      this.setState({name: event.target.value})
    },

    handleEmailChanges: function(event) {
      this.setState({email: event.target.value});
    },

    createAttendee: function (argument) {
      
      if (!this.state.name)
        return;

      FluxMeetingActions.createAttendee(this.state);
    },

    renderAttendeeList: function (event) {
      var user = this.props.user;
      var admins = this.props.admins;
      var attendees = this.props.attendees;
      
      var isUser = false;

      if(attendees.length > 0) {

        return attendees.map(function (attendee, index) {

          isUser = attendee.id === user.id;
                  
          return (
            <FluxAttendeeItem key={index} attendee={attendee} isUser={isUser}/>
          );
        });
      }
    },

    render: function(){
        var canEdit = this.props.canEdit;

        return(
          <div className="nano-content">
            <div className="list-group bg-trans list-attendees">
              {this.renderAttendeeList()}
            </div>
            <form className={ canEdit ? "form-horizontal" : "hidden-container" }>
              <div className="col-xs-12">
                <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChanges}/>
              </div>
              <div className="col-xs-12">
                <input type="text" className="form-control" placeholder="E-Mail" value={this.state.email} onChange={this.handleEmailChanges}/>
              </div>
            </form>
            <div className="text-right col-xs-12">
              <button type="button" className={ canEdit ? "btn btn-info btn-labeled fa fa-plus" : "hidden-container" } onClick={this.createAttendee}>Add guest</button>
            </div>
          </div>
        );
    }
});

module.exports = FluxAttendeeList;
