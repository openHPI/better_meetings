var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxTodoListDoneItem = React.createClass({

    render: function(){
        var item = this.props.item;
        var index = this.props.index;
        return(
            <li key={index} className="todo-item todo-done">
                <h3 className="todo-title">{item.title}</h3>
                <p className="todo-author">author: {item.author}</p>
            </li>
        );
    }
});

module.exports = FluxTodoListDoneItem;