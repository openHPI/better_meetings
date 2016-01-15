var FluxAgendaActions = require('../actions/FluxAgendaActions');

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getMeetingData: function() {
    var data = JSON.parse(localStorage.getItem('product'));
	FluxAgendaActions.receiveAgenda({agenda: data.agendaItems, member: data.member, timer: data.timer});
  }

};