var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');
var FluxTodoList = require('./FluxTodoList.react');
var FluxTodoListDone = require('./FluxTodoListDone.react');
var FluxAgendaProgress = require('./FluxAgendaProgress.react');

// Flux todolist view
var FluxAgendaDetails = React.createClass({

    selectPrevious: function(event) {
        var index = (this.props.items.indexOf(this.props.selected) - 1);
        var index = (0 > index) ? (this.props.items.length-1) : index;
        FluxAgendaActions.selectAgendaItem(index);
    },

    // Select next agenda item
    selectNext: function(event) {
        var index = (this.props.items.indexOf(this.props.selected) + 1) % this.props.items.length;
        FluxAgendaActions.selectAgendaItem(index);
    },

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
                <button type="button" className="btn btn-default" onClick={this.selectPrevious}>
                    <i className="fa fa-caret-left"></i>
                </button>
                <button type="button" className="btn btn-default" onClick={this.selectNext}>
                    <i className="fa fa-caret-right"></i>

                </button>
            </div>
        );
    }
});

module.exports = FluxAgendaDetails;