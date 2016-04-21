var FluxMeetingActions = require('../actions/FluxMeetingActions');
var Select = require('react-select');

import React from 'react';
import ReactDOM from 'react-dom';
import {RIEToggle, RIEInput, RIENumber, RIETags} from 'riek';

var FluxTodoItemUpdate = React.createClass({

  getInitialState: function () {
    var item = this.props.item;
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      owner: item.owner,
      author: item.author,
      assignees: item.assignees,
      done: item.done,
      important: item.important,
      options: this.props.options
    };
  },

  componentWillReceiveProps: function () {
    var item = this.props.item;
    this.setState({
      id: item.id,
      title: item.title,
      description: item.title,
      owner: item.owner,
      author: item.author,
      assignees: item.assignees,
      done: item.done,
      important: item.important,
      options: this.props.options
    });
  },

  editItem: function(event) {
    FluxMeetingActions.editTodoItem(-1);
  },

  // Remove item from list via action
  deleteItem: function(event) {
    FluxMeetingActions.destroyTodoItem(this.props.item);
  },

  toggleImportant: function (event) {
    this.props.item.important = !this.props.item.important;
    FluxMeetingActions.updateTodoItem(this.props.item);
  },

  changedCallback: function (newState) {
    this.setState(newState);
  },

  saveChanges: function (event) {
    var item = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.title,
      owner: this.state.owner,
      author: this.state.author,
      assignees: this.state.assignees,
      done: this.state.done,
      important: this.state.important
    };
    
    FluxMeetingActions.updateTodoItem(item);
  },

  customValidateTitle: function (title) {
    return (title.length > 0 && title.length < 64);
  },

  render: function () {
    var item = this.props.item;
    var canEdit = this.props.canEdit;

    return (
      <li className={ "panel panel-bordered-primary todo-item updating" + (item.done ? " done" : "") } draggable={false}>

        <div className="panel-heading">
          <div className="panel-control">
              <button className="btn btn-xs btn-danger add-tooltip" onClick={this.deleteItem}><i className="fa fa-times"></i></button>
              <button className="btn btn-xs btn-default add-tooltip" onClick={this.editItem}><i className="fa fa-exclamation-circle"></i></button>
              <button className="btn btn-xs btn-default add-tooltip" onClick={this.toggleImportant}><i className={ item.important ? "fa fa-star" : "fa fa-star-o" }></i></button>
          </div>
          <h3 className="panel-title">
            <RIEInput
              value={this.state.title}
              change={this.changedCallback}
              propName="title"
              validate={this.customValidateTitle} />
          </h3>
        </div>

        <form className="panel-body form-horizontal form-padding">

          <div className='form-group'>
            <label className='col-md-3 control-label'>Description</label>
            <div className='col-md-9'>
              <textarea className='description-textarea' rows='9' className='form-control' defaultValue={this.state.description}></textarea>
              <small className='help-block'>Please enter a description</small>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-3 control-label">Assignees</label>
            <div className="col-md-9">
              <Select name="assignees" multi simpleValue value={this.props.assignees} placeholder="Assign this todo to someone" options={this.state.options} onChange={this._assigneesChange} />
              <small className="help-block">Please enter a title</small>
            </div>
          </div>

          <div className="text-right">
            <button className="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
          </div>

        </form>

      </li>
    );
  },

  _assigneesChange: function(assignees) {
    this.setState({ assignees: assignees });
  }

});

module.exports = FluxTodoItemUpdate;
