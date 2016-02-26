var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

var InlineEdit = require('react-edit-inline');

var FluxTodoItemUpdateForm = React.createClass({

    getInitialState: function(){

      var title = this.props.item !== null ? this.props.item.title : null;
      var description = this.props.item !== null ? this.props.item.description : null;

      return { title: title, description: description };
    },

    titleChanged: function(title) {
      this.setState({ title: title });
    },

    descriptionChanged: function(description) {
      this.setState({ description: description });
    },

    customValidateTitle: function(title) {
      return (title.length > 0 && title.length < 64);
    },

    // Edits a todo item via Actions
    editTodoItem: function(event) {
        var title = jQuery('#updateTodoItemModal .title-input').val();
        var description = jQuery('#updateTodoItemModal .description-textarea').val();

        if (!title) {
            return;
        }

        var item = this.props.item;
        item.title = title;
        item.description = description;

        FluxMeetingActions.updateTodoItem(item);

        jQuery('#updateTodoItemModal .title-input').val('');
        jQuery('#updateTodoItemModal .description-textarea').val('');
        jQuery('#updateTodoItemModal').modal('hide');
    },

    render: function() {

        var canEdit = this.props.canEdit;
        var title = (this.props.item !== null) ? this.props.item.title : null;
        var description = (this.props.item !== null) ? this.props.item.description : null;

        return (

            <div className="modal fade" tabIndex="-1" role="dialog" id="updateTodoItemModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close" data-dismiss="modal"><span>×</span></button>
                    <h4 className="modal-title">Upate todo item</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="col-md-3 control-label">Title</label>
                      <div className="col-md-9">
                        <small className="help-block">Please enter a title</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">Description</label>
                      <div className="col-md-9">
                        <textarea className="description-textarea" rows="9" className="form-control" placeholder="Description">{description}</textarea>
                        <small className="help-block">Please enter a description</small>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success" id="updateTopicModalSubmit">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }

});

module.exports = FluxTodoItemUpdateForm;