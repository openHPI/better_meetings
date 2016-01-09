var React = require('react');

// AgendaProgress
var FluxAgendaProgress = React.createClass({

	render: function () {
		var index = this.props.index;
		var total = this.props.total;
		var percentage = (index + 1) / total * 100;

		var progressbarStyle = { width: percentage.toString() + '%'};

		return (
			<div className="flux-agendaProgress-container">
				<h4>{index + 1} / {total}</h4>
				<div className="progress">
					<div id="agenda-progress-bar" className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={progressbarStyle}>
				    	{percentage}% Complete
					</div>
				</div>
			</div>
		);
	}
});

module.exports = FluxAgendaProgress;