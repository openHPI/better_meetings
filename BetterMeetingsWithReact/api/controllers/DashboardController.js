/**
 * DashboardController
 *
 * @description :: Server-side logic for the dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  view: function (req, res) {
    return res.view('dashboard', {});
  },

};

