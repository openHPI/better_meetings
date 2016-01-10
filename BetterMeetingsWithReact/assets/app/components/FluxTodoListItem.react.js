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
        FluxAgendaActions.markAsDone(this.props.index);
    },

    render: function(){
        var item = this.props.item;
        var index = this.props.index;
        return(
            <li key={index} className="todo-item">
                <h3 className="todo-title">{item.title}</h3>
                <p className="todo-author">author: {item.author}</p>
                <button type="button" className="btn btn-default" onClick={this.deleteItem}>Delete</button>
                <button type="button" className="btn btn-default" onClick={this.markDone}>Done</button>
            </li>
        );
    }
});

module.exports = FluxTodoListItem;