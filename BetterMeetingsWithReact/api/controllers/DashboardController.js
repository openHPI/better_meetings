/**
 * DashboardController
 *
 * @description :: Server-side logic for the dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  view: function (req, res) {
    person.findOne(req.session.me.id)
      .populate('createdMeetings')
      .populate('assignedMeetings')
      .exec(function found(err, person) {
        var meetingseriesList;
        var meetingHistory;

        if (err) {
          sails.log.error('ERR:', err);
        }

        if (!person) {
          console.log('no person found');
          return;
        }

        meetingseriesList = person.createdMeetings || [];
        meetingHistory = person.assignedMeetings || [];

        meetingHistory.sort(function compare(a, b) {
          if (a.startTime < b.startTime) {
            return 1;
          } else if (a.startTime > b.startTime) {
            return -1;
          }

          return 0;
        });

        if (meetingseriesList.length === 0) {
          res.view('dashboard', {
            meetingseriesList: meetingseriesList,
            meetingHistory: meetingHistory
          });
          return;
        }

        DeepPopulateService.populateDeep('person', person,
          'createdMeetings.instances',
          function (populateErr, populatedPerson) {
            if (populateErr) {
              console.log('ERR: ');
              console.log(populateErr);
            }

            meetingseriesList = populatedPerson.createdMeetings;

            meetingseriesList.sort(function compare(a, b) {
              if (a.updatedAt < b.updatedAt) {
                return 1;
              } else if (a.updatedAt > b.updatedAt) {
                return -1;
              }

              return 0;
            });

            return res.view('dashboard', {
              meetingseriesList: meetingseriesList,
              meetingHistory: meetingHistory
            });
          });
      });
  }
};
