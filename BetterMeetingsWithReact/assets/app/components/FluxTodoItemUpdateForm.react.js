var FluxMeetingActions = require('../actions/FluxMeetingActions');

import React from 'react';
import ReactDOM from 'react-dom';

import InlineEdit from 'react-edit-inline';

var FluxTodoItemUpdateForm = React.createClass({

    getInitialState: function() {

      return { title: '', description: '', assignee: [] };
    },

    componentWillReceiveProps: function() {
      if(this.props.item !== null)
        this.setState({ title: this.props.item.title, description: this.props.item.title });
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

        if (!this.state.title) {
            return;
        }

        FluxMeetingActions.updateTodoItem(this.state.title, this.state.description, this.state.assignee);

        this.setState({title: '', description: ''});

        jQuery('#updateTodoItemModal').modal('hide');
    },

    render: function() {

        var canEdit = this.props.canEdit;
                 
        return(
          <div className='modal fade' tabIndex='-1' role='dialog' id='updateTodoItemModal'>
                        <div className='modal-dialog modal-lg'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <button className='close' data-dismiss='modal'>
                                <span> × </span> 
                              </button>
                              <h4 className='modal-title'>Upate todo item</h4>
                            </div>
                            <div className='modal-body'>
                              <div className='form-group'>
                                <label className='col-md-3 control-label'>Title</label>
                                <div className='col-md-9'>
                                  <InlineEdit validate={this.customValidateTitle} text={this.state.title} paramName='title' change={this.titleChanged} />
                                  <small className='help-block'>Please enter a title</small>
                                </div>
                              </div>
                              <div className='form-group'>
                                <label className='col-md-3 control-label'>Description</label>
                                <div className='col-md-9'>
                                  <textarea className='description-textarea' rows='9' className='form-control' defaultValue={this.state.description}></textarea>
                                  <small className='help-block'>Please enter a description</small>
                                </div>
                              </div>
                            </div>
                            <div className='modal-footer'>
                              <button type='submit' className='btn btn-success' onClick={this.editTodoItem}>Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div>
        );
    }

});

module.exports = FluxTodoItemUpdateForm;