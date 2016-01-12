var React = require('react');

// AgendaProgress
var FluxAgendaUpload = React.createClass({

  render: function () {

    return (
      <form action="#" method="post" enctype="multipart/form-data">
        <input name="Datei" type="file" size="50" accept="text/*, application/pdf" /> 
        <button type="button" className="btn btn-default"><i className="fa fa-upload"></i></button>
      </form>
    );
  }
});

module.exports = FluxAgendaUpload;