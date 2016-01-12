var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxTodoListDoneItem = React.createClass({

    render: function(){
        var item = this.props.item;
        var index = this.props.index;
        return(
            <li key={index} className="todo-item todo-done">
                <p className="todo-title">{item.title}</p>
                <small className="todo-author"><i className="fa fa-user"></i>{item.author}</small>
            </li>
        );
    }
});

module.exports = FluxTodoListDoneItem;