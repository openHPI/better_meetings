/**
 * DashboardController
 *
 * @description :: Server-side logic for the dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  view: function (req, res) {
    person.findOne(req.session.me.id).populate('createdMeetings').exec(function found(err, person) {
      if (err) {
        sails.log.error("ERR:", err);
      }

      if (!person) {
        console.log("no person found");
        return;
      }

      var meetingseriesList = person.createdMeetings;

      return res.view('dashboard', {
        meetingseriesList: meetingseriesList,
        upcomingMeetings: [],
      });
    });
  },

};

