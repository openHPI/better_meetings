var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

var FluxTodoListForm = React.createClass({

    getInitialState: function() {
        return { autocomplete: [], assignee: null };
    },

    // Add item to list via Actions
    addItem: function(event) {
        var title = jQuery('#todo-title').val();
        var description = (jQuery('#todo-description').val() !== '') ? jQuery('#todo-description').val() : null;
        var assignee = (this.state.assignee !== null) ? this.state.assignee.id : null;

        if (!title) {
            return;
        }
        var item = { title: title, description: description, assignee: assignee, done: false };
        FluxMeetingActions.addToList(item);

        this.setState({ autocomplete: [], assignee: null });

        jQuery('#todo-title').val('');
        jQuery('#todo-description').val('');
        jQuery('#assign-autocomplete').val('');
        jQuery('#assign-input').val('');
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
                                    <label>Title:</label>
                                    <input id="todo-title" type="text" />
                                    <label>Description:</label>
                                    <textarea className="form-control" rows="5" id="todo-description"></textarea>
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

            this.props.member.forEach(function (member, index) {

                if(input === member.name.substring(0, input.length))
                    suggestions.push(member);
            });

            if(suggestions.length > 0)
                document.getElementById('assign-autocomplete').value = suggestions[0].name;
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
            document.getElementById('assign-input').value= this.state.autocomplete[0].name;
            this.setState({ assignee: this.state.autocomplete[0] });
        }
    }

});

module.exports = FluxTodoListForm;