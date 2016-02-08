var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxTodoListItem = React.createClass({

    collapseItem: function(event) {
        event.preventDefault();
        if(this.props.collapsed)
            FluxAgendaActions.collapsTodoItem(-1);
        else
            FluxAgendaActions.collapsTodoItem(this.props.index);
    },

    // Remove item from list via action
    deleteItem: function(event) {
        FluxAgendaActions.removeFromList(this.props.item.id);
    },

    // Mark an item as done
    toggleDone: function(event) {
        FluxAgendaActions.toggleDone(this.props.item);
    },

    render: function(){
        var item = this.props.item;
        var index = this.props.index;
        var canEdit = this.props.canEdit;

        var todoContentStyle = {
            display: (this.props.collapsed) ? 'block' : 'none'
        };

        return(
            <li className="list-group-item" key={index} className={ (item.done) ? "todo-item done" : "todo-item" }>
                <label className="form-checkbox form-icon">
                    <input type="checkbox" onClick={this.toggleDone} checked={item.done}/>
                    <span>{item.title}</span>
                </label>
                <div className="todo-control text-right">
                    <a className="btn btn-xs btn-default add-tooltip" onClick={this.collapseItem} ><i className="fa fa-exclamation-circle"></i></a>
                    <a className="btn btn-xs btn-danger add-tooltip" onClick={this.deleteItem}><i className="fa fa-times"></i></a>
                </div>
                <div className="todo-content" style={todoContentStyle}>
                    <p>Description:</p>
                    <p className="todo-description">{ (item.description !== undefined && item.description !== null) ? item.description : 'Add description'}</p>
                    <small className="todo-author"><i className="fa fa-user"></i>author</small>
                    <small className="todo-assignee">assigned to: <p>{ (item.assignee !== undefined && item.assignee !== null) ? item.assignee.name : 'none' }</p></small>
                </div>
            </li>
        );
    }

});

module.exports = FluxTodoListItem;
