var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');
var Select = require('react-select');

var FluxTodoItemCreateForm = React.createClass({

    getInitialState: function() {
        return { title: '', description: '', assignees: [], important: false, options: this.props.options };
    },

    componentWillReceiveProps: function() {
      this.setState({ options: this.props.options });
    },

    toggleImportant: function() {
      this.setState({important: !this.state.important})
    },

    // Add item to list via Actions
    createTodoItem: function(event) {

        if (!this.state.title) return;

        var item = {
          title: this.state.title,
          description: this.state.description,
          assignees: assignees,
          done: false,
          important: this.state.important
        };

        FluxMeetingActions.createTodoItem(item);

        this.setState({ title: '', description: '', assigneess: '', important: false});

        jQuery('#createTodoItemModal').modal('hide');
    },

    render: function() {

        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id="createTodoItemModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close" data-dismiss="modal"><span>×</span></button>
                    <h4 className="modal-title" style={ {display: 'inline-block'} }>New todo item</h4>
                    <a className="btn btn-xs btn-default add-tooltip" onClick={this.toggleImportant} style={ {marginTop: '-7px', marginLeft: '10px'} }>
                      <i className={ this.state.important ? "fa fa-star" : "fa fa-star-o" }></i>
                    </a>
                  </div>
                  <form className="modal-body form-horizontal form-padding">
                    <div className="form-group">
                      <label className="col-md-3 control-label">Title</label>
                      <div className="col-md-9">
                        <input type="text" className="form-control" placeholder="Title" required={true} onChange={this._titleChange} value={this.state.title} />
                        <small className="help-block">Please enter a title</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">Description</label>
                      <div className="col-md-9">
                        <textarea rows="9" className="form-control" placeholder="Description" onChange={this._descriptionChange} ref="description" defaultValue={this.state.description}></textarea>
                        <small className="help-block">Please enter a description</small>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-3 control-label">Assignees</label>
                      <div className="col-md-9">
                        <Select name="assignees" multi simpleValue value={this.props.assignees} placeholder="Assign this todo to someone" options={this.state.options} onChange={this._assigneesChange} />
                        <small className="help-block">Please enter a title</small>
                      </div>
                    </div>
                  </form>
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
    },

    _assigneesChange: function(assginees) {
      this.setState({ assignees: assignees });
    }

});

module.exports = FluxTodoItemCreateForm;
