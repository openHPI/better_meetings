var React = require('react');

require('react-bootstrap').OverlayTrigger;
require('react-bootstrap').Popover;

// Flux qrcode view
var FluxQrViewer = React.createClass({

  render: function () {
    var qrcode = this.props.qrcode;

    var svgContainerStyle = {
      width: '200px',
      height: '200px'
    };

    var smallSvgStyle = {
      width: '50px',
      height: '50px'
    };

    return (
      <div className="panel">
        <div className="panel-body">
          <OverlayTrigger trigger="hover" placement="top" overlay={
                <Popover title="Meeting Code" style={ svgContainerStyle }>
                  <div dangerouslySetInnerHTML={{ __html: qrcode }} style={ svgContainerStyle }></div>
                  </Popover>}>
            <div className="center-block" dangerouslySetInnerHTML={{ __html: qrcode }} style={ smallSvgStyle }></div>
          </OverlayTrigger>
        </div>
      </div>
    );
  }

});

module.exports = FluxQrViewer;
