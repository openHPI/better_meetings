var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

var FluxTaskForm = React.createClass({

    getInitialState: function() {
        return { autocomplete: [], assignee: null };
    },

    // Add item to list via Actions
    addItem: function(event) {
        var text = jQuery('#todo-input').val();

        if (!text) {
            return;
        }
        var item = { title: text, assignee: this.state.assignee };
        FluxAgendaActions.addToList(item);

        jQuery('#todo-input').val("");
        jQuery('#assign-autocomplete').val("");
        jQuery('#assign-input').val("");
        jQuery('#newListElementModal').modal('hide');
    },

    render: function() {
        return (
            <div id="newListElementModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">New Element</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset className="form-group">
                                    <label>Comment:</label>
                                    <textarea className="form-control" rows="5" id="todo-input"></textarea>
                                </fieldset>
                                <div className="assign-input-container">
                                    <input id="assign-input" type="text" onChange={this._onChange} onKeyUp={this._onKeyUp} />
                                    <input id="assign-autocomplete" type="text" disabled="disabled" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.addItem}>Create new</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function(event) {
        if(event.target.value.length != 0){

            var suggestions = [];
            var input = event.target.value;

            this.props.member.forEach(function (element, index) {

                var substring = (element.name + ' ' + element.surname).substring(0, input.length);
                if(input === substring)
                    suggestions.push(element);
            });

            if(suggestions.length > 0)
                document.getElementById('assign-autocomplete').value = suggestions[0].name + ' ' + suggestions[0].surname;
            else
                document.getElementById('assign-autocomplete').value = '';

            this.setState({autocomplete: suggestions});
        }

        else {
            document.getElementById('assign-autocomplete').value = '';
        }
    },

    _onKeyUp: function(event) {
        if(event.keyCode === 13) {
            document.getElementById('assign-input').value= this.state.autocomplete[0].name + ' ' + this.state.autocomplete[0].surname;
            this.setState({ assignee: this.state.autocomplete[0] });
        }
    }

});

module.exports = FluxTaskForm;