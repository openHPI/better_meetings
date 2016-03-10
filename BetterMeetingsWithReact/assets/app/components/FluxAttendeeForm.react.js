var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

/**
 * FluxAttendeeForm
 *
 * @module FluxAttendeeForm
 * @require React
 * @require FluxMeetingActions
 *
 */
var FluxAttendeeForm = React.createClass({

  // Add item to list via Actions
  createAttendee: function (event) {
    var name = jQuery('#attendee-name').val();
    var email = (jQuery('#attendee-email').val() !== '') ? jQuery('#attendee-email').val() : null;

    if (!name) {
      return;
    }

    var item = { name: name, email: email };
    FluxMeetingActions.createAttendee(item);

    jQuery('#attendee-name').val('');
    jQuery('#attendee-email').val('');
    jQuery('#newMemberModal').modal('hide');
  },

  render: function () {
    return (
      <div id="newAttendeeModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-name">New attendee</h4>
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="form-group">
                  <label>Name:</label>
                  <input id="attendee-name" type="text"/>
                  <label>Email:</label>
                  <input id="attendee-email" type="email" placeholder="example@hpi.de"/>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" onClick={this.createAttendee}>Create attendee</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FluxAttendeeForm;
