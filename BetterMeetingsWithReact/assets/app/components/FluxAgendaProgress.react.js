var React = require('react');

// AgendaProgress
var FluxAgendaProgress = React.createClass({

	render: function () {
		var index = this.props.index;
		var total = this.props.total;
		var percentage =  (index >= 0) ? (index + 1) / total * 100 : 0;

		var progressbarStyle = { width: percentage.toString() + '%'};

		return (
			<div className="flux-agendaProgress-container">
				<div className="progress">
					<div id="agenda-progress-bar" className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={progressbarStyle}>
				    	{Math.round(percentage)}% Complete
					</div>
				</div>
				<h4>{index + 1} / {total}</h4>
			</div>
		);
	}
});

module.exports = FluxAgendaProgress;