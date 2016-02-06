var React = require('react');

var FluxAgendaTimer = React.createClass({

  getInitialState: function() {
    return {
      timer: this.props.timer
    };
  },

  tick: function() {
    if(this.props.hasStarted)
      this.setState({timer: this.state.timer - 1});
    else
      this.setState({timer: this.props.timer});
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {

    var minutes = Math.floor(this.state.timer / 60);
    var seconds = this.state.timer - minutes * 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    var divStyles = {
      color: (minutes >= 0) ? 'white' : 'red'
    };

    return (
      <div className="panel panel-colorful panel-info">
        <h3 className="panel-title" id="timer" style={divStyles}>{minutes} : {seconds} min</h3>
      </div>
    );
  }

});

module.exports = FluxAgendaTimer;
