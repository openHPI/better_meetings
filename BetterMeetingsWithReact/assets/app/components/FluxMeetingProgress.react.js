var React = require('react');

// AgendaProgress
var FluxMeetingProgress = React.createClass({

	render: function () {
		var index = this.props.index;
		var total = this.props.total;
		var percentage =  (index >= 0) ? index / total * 100 : 0;

		var progressbarStyle = { width: percentage.toString() + '%'};

		return (
			<div className="flux-agendaProgress-container">
				<div className="progress">
					<div id="agenda-progress-bar" className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={progressbarStyle}>
				    	{Math.round(percentage)}%
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FluxMeetingProgress;
