var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;
var Button = require('react-bootstrap').Button;

// Flux qrcode view
var FluxQrViewer = React.createClass({

  render: function () {

    var qrcode = this.props.qrcode;

    var svgContainerStyle = {
      width: '200px',
      height: '200px'
    }

    var smallSvgStyle = {
      width: '50px',
      height: '50px'
    }

    return (

      <div className="panel">
        <div className="panel-heading">
          <div className="panel-body">
            <OverlayTrigger trigger="hover" placement="top" overlay={
                <Popover title="Meeting Code" style={ svgContainerStyle }>
                  <div dangerouslySetInnerHTML={{__html: qrcode}} style={ svgContainerStyle }></div>
                  </Popover>}>
              <div className="center-block" dangerouslySetInnerHTML={{__html: qrcode}} style={ smallSvgStyle }></div>
            </OverlayTrigger>
          </div>
        </div>

      </div>
    );
  }

});

module.exports = FluxQrViewer;
