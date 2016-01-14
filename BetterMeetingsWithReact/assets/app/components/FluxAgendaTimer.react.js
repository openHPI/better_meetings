var React = require('react');

var FluxAgendaTimer = React.createClass({

  getInitialState: function() {
    return {
      timer: this.props.timer
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

    return (
      <div>{minutes} : {seconds} min</div>
    );
  }

});

module.exports = FluxAgendaTimer;