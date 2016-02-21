var React = require('react');

var FluxMeetingTimer = React.createClass({

  getInitialState: function() {
    return {
      timer: this.props.timer,
      totaltime: this.props.timer
    };
  },

  tick: function() {
    this.setState({timer: this.state.timer - 1});
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

    var panelClass = " panel-info";

    if ( minutes * 60 + seconds < 0.2 * this.state.totaltime )
      panelClass = " panel-warning";
    
    if ( minutes < 0 )
      panelClass = " panel-danger";

    return (
      <div id="timer" className={ "panel panel-colorful" + panelClass }>
        <h3 className="panel-title">{minutes} : {seconds} min</h3>
      </div>
    );
  }

});

module.exports = FluxMeetingTimer;
