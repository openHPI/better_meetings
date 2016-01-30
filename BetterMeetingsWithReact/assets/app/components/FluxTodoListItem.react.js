var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxTodoListItem = React.createClass({

    // Remove item from list via action
    deleteItem: function(event) {
        FluxAgendaActions.removeFromList(this.props.index);
    },

    // Mark an item as done
    markDone: function(event) {
        FluxAgendaActions.markAsDone(this.props.item);
    },

    render: function(){
        var item = this.props.item;
        var index = this.props.index;
        var canEdit = this.props.canEdit;

        var editStyle = {
            display: (this.props.canEdit) ? 'inline-block' : 'none'
        };
        var todoContentStyle = {
            display: (this.props.collapsed) ? 'block' : 'none'
        };

        return(
            <li className="list-group-item" key={index} className={ (item.done) ? "todo-item done" : "todo-item" } onDoubleClick={this._onDoubleClick}>
                <p className="todo-title">{item.title}</p>
                <small className="todo-author"><i className="fa fa-user"></i>{item.author}</small>
                <small className="todo-assignee">assigned to: <p>{ (item.assignee !== null) ? item.assignee.name : 'none' }</p></small>
                <button type="button" className="btn btn-default" onClick={this.deleteItem} style={editStyle}><i className="fa fa-times"></i></button>
                <button type="button" className="btn btn-default" onClick={this.markDone} style={editStyle}><i className="fa fa-check"></i></button>
                <div className="todo-content" style={todoContentStyle}>
                    <p>Description:</p>
                    <p className="todo-description">{ (item.description !== undefined && item.description !== null) ? item.description : 'Add description'}</p>
                </div>
            </li>
        );
    },

    _onDoubleClick: function(event) {
        event.preventDefault();
        if(this.props.collapsed)
            FluxAgendaActions.collapsTodoItem(-1);
        else
            FluxAgendaActions.collapsTodoItem(this.props.index);
    }

});

module.exports = FluxTodoListItem;