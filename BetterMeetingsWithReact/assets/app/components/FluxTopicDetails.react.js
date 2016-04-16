var React = require('react');
var ReactDOM = require('react-dom');

var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux todolist view
var FluxTopicDetails = React.createClass({

    renderSubitemList: function() {
        var selected = this.props.selected;
        if (selected.subAgendaItems !== undefined && selected.subAgendaItems !== null && selected.subAgendaItems.length > 0) {
            return selected.subAgendaItems.map(function (item, index) {
                return (
                    <li className="list-item" key={index} >
                        {item}
                    </li>
                );
            });
        }
    },

    render: function(){
        var selected = this.props.selected;

        return(
            <div className="flux-agendaDetails-container panel">
                <div className="panel-heading">
                    <h3 className="panel-title">DETAILS</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="topicDetails-description">
                            <p>{selected.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={ (selected.subAgendaItems !== undefined && selected.subAgendaItems !== null) ? "list-group-item col-md-6 col-xs-12" : "hidden" }>
                            <h4>Subitems</h4>
                            { this.renderSubitemList() }
                        </div>
                        <div className={ (selected.note !== undefined && selected.note !== null) ? "flux-agendaDetails-notes col-md-6 col-xs-12" : "hidden" }>
                            <h4>Note</h4>
                            {selected.note}
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <form className="flux-agendaDetails-upload" action="#" method="post" encType="multipart/form-data">
                        <input name="Datei" type="file" size="50" accept="text/*, application/pdf" />
                        <button type="button" className="btn btn-default"><i className="fa fa-upload"></i></button>
                    </form>
                </div>
            </div>
        );
    }

});

module.exports = FluxTopicDetails;
