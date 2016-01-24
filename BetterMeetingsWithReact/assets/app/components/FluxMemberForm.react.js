var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

var FluxMemberForm = React.createClass({

    // Add item to list via Actions
    addMember: function(event) {
        var name = jQuery('#member-name').val();
        var email = (jQuery('#member-email').val() !== '') ? jQuery('#member-email').val() : null;

        if (!name) {
            return;
        }
        var item = { displayname: name, email: email, password: 'password' };
        FluxAgendaActions.addMember(item);

        jQuery('#member-name').val('');
        jQuery('#member-email').val('');
        jQuery('#newMemberModal').modal('hide');
    },

    render: function() {
        return (
            <div id="newMemberModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-name">New member</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset className="form-group">
                                    <label>Name:</label>
                                    <input id="member-name" type="text" />
                                    <label>Email:</label>
                                    <input id="member-email" type="email" placeholder="example@hpi.de" />
                                </fieldset>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.addMember}>add member</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FluxMemberForm;