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
                <p className="todo-title">{item.title}</p>
                <small className="todo-author"><i className="fa fa-user"></i>{item.author}</small>
                <button type="button" className="btn btn-default" onClick={this.deleteItem}><i className="fa fa-times"></i></button>
                <button type="button" className="btn btn-default" onClick={this.markDone}><i className="fa fa-check"></i></button>
            </li>
        );
    }
});

module.exports = FluxTodoListItem;