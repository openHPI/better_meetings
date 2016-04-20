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
        var createdMeetings;
        var meetingHistory;

        if (err) {
          sails.log.error('ERR:', err);
        }

        if (!person) {
          console.log('no person found');
          return;
        }

        createdMeetings = person.createdMeetings || [];
        meetingHistory = person.assignedMeetings || [];

        meetingHistory.sort(function compare(a, b) {
          // biggest schedule date be the first
          if (a.scheduledAt < b.scheduledAt) {
            return 1;
          } else if (a.scheduledAt > b.scheduledAt) {
            return -1;
          }

          // if schedule date is equal than the updatedAt date decide
          if (a.updatedAt < b.updatedAt) {
            return 1;
          } else if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          
          return 0;
        });

        if (createdMeetings.length === 0) {
          res.view('dashboard', {
            meetingseriesList: createdMeetings,
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

            createdMeetings = populatedPerson.createdMeetings;

            createdMeetings.sort(function compare(a, b) {
              if (a.updatedAt > b.updatedAt) {
                return -1;
              } else if (a.updatedAt < b.updatedAt) {
                return 1;
              }

              return 0;
            });

            return res.view('dashboard', {
              meetingseriesList: createdMeetings,
              meetingHistory: meetingHistory
            });
          });
      });
  }
};
