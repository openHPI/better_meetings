/**
 * DashboardController
 *
 * @description :: Server-side logic for the dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  view: function (req, res) {
    person.findOne(req.session.me.id).populate('createdMeetings').populate('assignedMeetings').exec(function found(err, person) {
      if (err) {
        sails.log.error("ERR:", err);
      }

      if (!person) {
        console.log("no person found");
        return;
      }

      var meetingseriesList = person.createdMeetings || [];
      var meetingHistory = person.assignedMeetings || [];

      if (meetingseriesList.length == 0) {
        return res.view('dashboard', {
          meetingseriesList: meetingseriesList,
          meetingHistory: meetingHistory
        });
      }

      DeepPopulateService.populateDeep('person', person,
        'createdMeetings.instances',
        function (err, person) {
          if (err) {
            console.log("ERR: ");
            console.log(err);
          }

          meetingseriesList = person.createdMeetings;
          //meetingHistory = person.assignedMeetings || [];

          return res.view('dashboard', {
            meetingseriesList: meetingseriesList,
            meetingHistory: meetingHistory
          });
        });
    });
  },

};

