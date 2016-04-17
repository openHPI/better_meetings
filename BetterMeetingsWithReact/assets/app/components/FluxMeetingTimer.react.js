var React = require('react');

var FluxMeetingTimer = React.createClass({

  getInitialState: function () {
    return {
      timer: this.calculateTimer(),
      totaltime: this.props.timer
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.isMeetingDone) {
      clearInterval(this.interval);
    }
  },

  calculateTimer: function () {
    var now = new Date().getTime();
    var start = new Date(this.props.startTime).getTime();
    var timer = this.props.timer;
    var timeDiff = Math.round((now - start) / 1000);
    var newTimer = timer - timeDiff;

    return newTimer;
  },

  tick: function () {
    this.setState({ timer: this.state.timer - 1 });
  },

  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  render: function () {

    var minutes = Math.floor(this.state.timer / 60);
    var seconds = this.state.timer - minutes * 60;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    var panelClass = "panel-info";

    if (minutes * 60 + seconds < 0.2 * this.state.totaltime)
      panelClass = "panel-warning";

    if (minutes < 0)
      panelClass = "panel-danger";

    return (
      <div id="timer" className={ "col-md-1 panel panel-colorful " + panelClass }>
        <span className="panel-title">{minutes} : {seconds}</span>
      </div>
    );
  }

});

module.exports = FluxMeetingTimer;
