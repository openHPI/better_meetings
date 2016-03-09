var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux todolist view
var FluxTodoItem = React.createClass({

    editItem: function(event) {
      FluxMeetingActions.editTodoItem(this.props.item.id);
    },

    // Remove item from list via action
    deleteItem: function(event) {
        FluxMeetingActions.destroyTodoItem(this.props.item);
    },

    toggleImportant: function (event) {
        this.props.item.important = !this.props.item.important;
        FluxMeetingActions.updateTodoItem(this.props.item);
    },

    // Mark an item as done
    toggleDone: function(event) {
      this.props.item.done = !this.props.item.done;
      FluxMeetingActions.updateTodoItem(this.props.item);
    },

    render: function(){

        var item = this.props.item;
        var index = this.props.index;
        var canEdit = this.props.canEdit;

        return (
            <li className={ item.important ? "todo-item highlighted" : "todo-item" } data-id={index} draggable={this.props.draggable} onDragStart={this.props.onDragStart} onDragEnd={this.props.onDragEnd}>
                <label className= { item.done ? "form-checkbox form-icon active" : "form-checkbox form-icon"}>
                    <input type="checkbox" onChange={this.toggleDone} checked={item.done}/>
                    <span>{item.title}</span>
                </label>
                <div className="todo-control text-right">
                    <a className="btn btn-xs btn-danger add-tooltip" onClick={this.deleteItem}><i className="fa fa-times"></i></a>
                  <a className="btn btn-xs btn-default add-tooltip" onClick={this.editItem}><i
                    className="fa fa-exclamation-circle"></i></a>
                  <a className="btn btn-xs btn-default add-tooltip" onClick={this.toggleImportant}><i
                    className={ item.important ? "fa fa-star" : "fa fa-star-o" }></i></a>
                </div>
            </li>
        );
    }

});

module.exports = FluxTodoItem;
