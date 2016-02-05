var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxAdminConstants = require('../constants/FluxAdminConstants');

var FluxAdminActions = {

  receiveJourFixes: function(data) {
    AppDispatcher.handleAction({
      actionType: FluxAdminConstants.RECEIVE_ADMIN_DATA,
      data: data
    })
  }
};

module.exports = FluxAdminActions;