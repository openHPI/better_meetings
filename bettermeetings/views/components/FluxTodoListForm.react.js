var React = require('react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

var FluxTaskForm = React.createClass({

    handleChange: function(event) {
        this.setState({text: event.target.value});
    },

    // Add item to list via Actions
    addItem: function(event) {
        var text = $('#todo-input').val();

        if (!text) {
            return;
        }
        var item = {id: "0", title: text};
        FluxAgendaActions.addToList(item);

        $('#todo-input').val("");
        $('#newListElementModal').modal('hide');
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.addItem}>Create new</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FluxTaskForm;