var React = require('react');
var FluxTodoList = require('./FluxTodoList.react');
var FluxTodoListDone = require('./FluxTodoListDone.react');
var FluxAgendaProgress = require('./FluxAgendaProgress.react')

// Flux todolist view
var FluxAgendaDetails = React.createClass({

    render: function(){
        var selected = this.props.selected;
        var items = this.props.selected.todoList;
        var done = this.props.selected.todoList_done;
        var member = this.props.member;

        return(
            <div className="flux-agendaDetails-container">
                <h1 className="flux-agendaDetails-header">{selected.title}</h1>
                <div className="flux-agendaDetails-description">
                    <h4>Description:</h4>
                    <p>{selected.description}</p>
                </div>
                <div className="flux-todolist">
                    <FluxTodoList items={items} member={member} />
                    <FluxTodoListDone items={done} />
                </div>
            </div>
        );
    }
});

module.exports = FluxAgendaDetails;