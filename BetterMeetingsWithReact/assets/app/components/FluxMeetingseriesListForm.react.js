var React = require('react');
var FluxAdminActions = require('../actions/FluxAgendaActions');

var FluxMeetingseriesListForm = React.createClass({

    // Add item to list via Actions
    createMeetingseries: function(event) {
        var title = jQuery('#meeting-title-input').val();
        var description = jQuery('#meeting-description-textarea').val();
        var admins;
        var timer = jQuery('#meeting-timer-input').val();
        var url = jQuery('#meeting-url-input');
        
        if ( title === null || description === null) {
            return;
        }

        var meetingseries = { title: title, description: description, admins: admins, timer: timer, url: url };
        FluxAdminActions.createMeetingseries(meetingseries);

        this.setState({ autocomplete: [], assignee: null });

        jQuery('#meeting-title-input').val('');
        jQuery('#meeting-description-textarea').val('');
        jQuery('#meeting-timer-input').val('');
        jQuery('#meeting-url-input').val('');
        jQuery('#newListElementModal').modal('hide');
    },

    render: function() {
        return (
            <div id="newMeetingseriesModal" className="modal fade" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">New meetingseries</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="col-md-3 control-label" for="meeting-title-input">Meeting title</label>
                                <div className="col-md-9">
                                    <input type="text" id="meeting-title-input" className="form-control" placeholder="Title" />
                                    <small className="help-block">Please enter a the meeting title</small>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-3 control-label" for="meeting-description-textarea">Description</label>
                                <div className="col-md-9">
                                    <textarea id="meeting-description-textarea" rows="9" className="form-control" placeholder="Description"></textarea>
                                    <small className="help-block">Please enter a the description</small>
                                </div>
                            </div>
                            <div>
                                <input type="text" id="meeting-admins-input" className="form-control" placeholder="Add an admin" value="" data-role="tagsinput" style="display: none;" />
                                <div class="bootstrap-tagsinput">
                                    <span class="tag label label-primary">User<span data-role="remove"></span></span>
                                    <input type="text" placeholder="Add an admin" style="width: 9em !important;" />
                                </div>
                            </div>

                            <hr/>
                            <br/>
                            <br/>

                            <p class="text-thin mar-btm">Timer</p>
                            <div class="input-group date">
                                <input id="meeting-timer-input" type="text" class="form-control" />
                                <span class="input-group-addon"><i class="fa fa-clock-o fa-lg"></i></span>
                            </div>

                            <br/>

                            <p class="text-thin mar-btm">URL</p>
                            <div class="input-group date">
                                <input id="meeting-url-input" type="text" class="form-control" />
                                <span class="input-group-addon"><i class="fa fa-globe-o fa-lg"></i></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.createMeetingseries}>Create new</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = FluxMeetingseriesListForm;