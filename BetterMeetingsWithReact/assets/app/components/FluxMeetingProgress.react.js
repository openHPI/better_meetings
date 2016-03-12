var React = require('react');
var ProgressBar = require('react-bootstrap').ProgressBar;

// AgendaProgress
var FluxMeetingProgress = React.createClass({

	render: function () {
		var index = this.props.index;
		var total = this.props.total;
		var percentage =  (index >= 0) ? index / total * 100 : 0;

		var progressbarStyle = { width: percentage.toString() + '%'};

		return (
			<div className="flux-agendaProgress-container">
				<ProgressBar now={percentage} label="%(percent)s%" />
			</div>
		);
	}
});

module.exports = FluxMeetingProgress;
