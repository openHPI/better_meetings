var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

var FluxTodoItemCreateForm = React.createClass({

    getInitialState: function() {
        return { title: '', description: '' };
    },

    // Add item to list via Actions
    createTodoItem: function(event) {

        if (!this.state.title) return;

      var item = {
        title: this.state.title,
        description: this.state.description,
        assignee: null,
          done: false,
          important: false
        };
        FluxMeetingActions.createTodoItem(item);

        this.setState({ title: '', description: '' });

      jQuery('#createTodoItemModal').modal('hide');
      jQuery(".modal-backdrop").each(function () {
        this.remove();
      });
    },

    render: function() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id="createTodoItemModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close" data-dismiss="modal"><span>×</span></button>
                    <h4 className="modal-title">New todo item</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="col-md-3 control-label">Title</label>
                      <div className="col-md-9">
                        <input className="title-input" type="text" className="form-control" placeholder="Title" onChange={this._titleChange} value={this.state.title} />
                        <small className="help-block">Please enter a title</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">Description</label>
                      <div className="col-md-9">
                        <textarea className="description-textarea" rows="9" className="form-control" placeholder="Description" onChange={this._descriptionChange} ref="description" defaultValue={this.state.description}></textarea>
                        <small className="help-block">Please enter a description</small>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success" onClick={this.createTodoItem}>Create new</button>
                  </div>
                </div>
              </div>
            </div>
        );
    },

    _titleChange: function(event) {
      this.setState({ title: event.target.value });
    },

    _descriptionChange: function() {
      this.setState({ description: this.refs.description.value });
    }

});

module.exports = FluxTodoItemCreateForm;
