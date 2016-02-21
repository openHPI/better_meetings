var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux todolist view
var FluxTopicDetails = React.createClass({

    render: function(){
        var selected = this.props.selected;

        return(
            <div className="flux-agendaDetails-container panel">
                <div className="panel-heading">
                    <h3 className="panel-title">DETAILS</h3>
                </div>
                <div className="panel-body">
                    <div className="flux-agendaDetails-description">
                        <p>{selected.description}</p>
                    </div>
                    <div className={ (selected.subitems === undefined && selected.subitems === null) ? "flux-agendaDetails-subitems" : "flux-agendaDetails-subitems hidden-container" }>
                        <h4>Subitems</h4>
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
