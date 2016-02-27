var FluxMeetingActions = require('../actions/FluxMeetingActions');

import InlineEdit from 'react-edit-inline';
import React from 'react';
import ReactDOM from 'react-dom';

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

        jQuery('#updateTodoItemModal').modal('hide');

        var title = this.state.title;
        var description = this.state.description;

        if (!title) {
            return;
        }

        var item = this.props.item;
        item.title = title;
        item.description = description;

        FluxMeetingActions.updateTodoItem(item);

        this.setState({title: '', description: ''});

        jQuery('#updateTodoItemModal').modal('hide');
    },

    render: function() {
        console.dir(InlineEdit);
        var canEdit = this.props.canEdit;
        var title = (this.props.item !== null) ? this.props.item.title : null;
        var description = (this.props.item !== null) ? this.props.item.description : null;
        
                 
        return(<div className='modal fade' tabIndex='-1' role='dialog' id='updateTodoItemModal'>
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
                                  <small className='help-block'>Please enter a title</small>
                                  <InlineEdit 
                                    validate={this.customValidateTitle} 
                                    text={this.state.title} 
                                    paramName='title' 
                                    change={this.titleChanged} />
                                </div>
                              </div>
                              <div className='form-group'>
                                <label className='col-md-3 control-label'>Description</label>
                                <div className='col-md-9'>
                                  <textarea className='description-textarea' rows='9' className='form-control' placeholder='Description'>{description}</textarea>
                                  <small className='help-block'>Please enter a description</small>
                                </div>
                              </div>
                            </div>
                            <div className='modal-footer'>
                              <button type='submit' className='btn btn-success' onClick={this.editTodoItem}>Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div>);
    }

});

module.exports = FluxTodoItemUpdateForm;