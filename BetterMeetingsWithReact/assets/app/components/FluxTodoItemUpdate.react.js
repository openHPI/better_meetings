var FluxMeetingActions = require('../actions/FluxMeetingActions');

import React from 'react';
import ReactDOM from 'react-dom';

import InlineEdit from 'react-edit-inline';

function getTodoItemUpdateState() {
  return {
    title: '',
    description: '',
    assignee: [],
    done: false,
    important: false
  };
}

var FluxTodoItemUpdate = React.createClass({

  getInitialState: function () {
    var item = this.props.item;
    return {
      title: item.title,
      description: item.description,
      assignee: item.assignee,
      done: item.done,
      important: item.important
    };
  },

  componentWillReceiveProps: function () {
    var item = this.props.item;
    this.setState({
      title: item.title,
      description: item.title,
      assignee: item.assignee,
      done: item.done,
      important: item.important
    });
  },

  titleChanged: function (title) {
    this.setState({title: title});
  },

  descriptionChanged: function (description) {
    this.setState({description: description});
  },

  customValidateTitle: function (title) {
    return (title.length > 0 && title.length < 64);
  },

  // Edits a todo item via Actions
  editTodoItem: function (event) {
    if (!this.state.title) {
      return;
    }

    FluxMeetingActions.updateTodoItem(this.state.title, this.state.description, this.state.assignee);
    this.setState(getTodoItemUpdateState);
  },

  render: function () {
    var item = this.props.item;
    var canEdit = this.props.canEdit;

    return (
      <li className={ item.done ? "panel todo-item done" : "panel todo-item" } draggable={false}>

        <div className="panel-heading">
          <h3 className="panel-title">Basic Form Elements</h3>
        </div>

        <form className="panel-body form-horizontal form-padding">

          <div className='form-group'>
            <label className='col-md-3 control-label'>Title</label>
            <div className='col-md-9'>
              <InlineEdit validate={this.customValidateTitle} text={this.state.title} paramName='title'
                          change={this.titleChanged}/>
              <small className='help-block'>Please enter a title</small>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-md-3 control-label'>Description</label>
            <div className='col-md-9'>
              <textarea className='description-textarea' rows='9' className='form-control'
                        defaultValue={this.state.description}></textarea>
              <small className='help-block'>Please enter a description</small>
            </div>
          </div>

        </form>
      </li>
    );
  }

});

module.exports = FluxTodoItemUpdate;
