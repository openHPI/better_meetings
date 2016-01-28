var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux todolist view
var FluxAgendaDetails = React.createClass({

    selectPrevious: function() {
        var index = (this.props.items.indexOf(this.props.selected) - 1);
        var index = (0 > index) ? (this.props.items.length-1) : index;
        FluxAgendaActions.selectAgendaItem(index);
    },

    // Select next agenda item
    selectNext: function() {
        var index = (this.props.items.indexOf(this.props.selected) + 1);
        if(index < this.props.items.length)
            FluxAgendaActions.selectAgendaItem(index);
        else
            FluxAgendaActions.endMeeting();
    },

    render: function(){
        var selected = this.props.selected;
        var collapsed = this.props.collapsed;
        var items = this.props.selected.todoList;
        var done = this.props.selected.todoList_done;
        var member = this.props.member;

        return(
            <div className="flux-agendaDetails-container" onKeyDown={this._onKeyDown}>
                <div className="flux-agendaDetails-description">
                    <h4>Description</h4>
                    <p>{selected.description}</p>
                </div>
                <div className="flux-agendaDetails-subitems">
                    <h4>Subitems</h4>
                </div>
                <form action="#" method="post" enctype="multipart/form-data">
                    <input name="Datei" type="file" size="50" accept="text/*, application/pdf" /> 
                    <button type="button" className="btn btn-default"><i className="fa fa-upload"></i></button>
                </form>
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