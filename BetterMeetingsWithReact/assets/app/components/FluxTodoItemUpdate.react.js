var FluxMeetingActions = require('../actions/FluxMeetingActions');

import React from 'react';
import ReactDOM from 'react-dom';
import {RIEToggle, RIEInput, RIENumber, RIETags} from 'riek';

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
              <textarea className='description-textarea' rows='9' className='form-control'
                        defaultValue={this.state.description}></textarea>
              <small className='help-block'>Please enter a description</small>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-md-3 control-label'>Assignees</label>
            <div className='col-md-9'>
              <RIETags
                value={['Peter Zwegat', 'Max Mustermann']}
                change={this.changedCallback}
                maxTags={5}
                minTags={0}
                propName="assignee"
                placeholder="New responsible person" />
              <small className='help-block'>Please enter a description</small>
            </div>
          </div>

        </form>
      </li>
    );
  }

});

module.exports = FluxTodoItemUpdate;
