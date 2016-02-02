/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createFromSeries: function (meetingseries) {
    var attendees = [];
    for (var i = 0; i < meetingseries.admins.length; i++) {
      attendees.push(meetingseries.admins[i]);
    }
    for (var i = 0; i < meetingseries.members.length; i++) {
      attendees.push(meetingseries.members[i]);
    }

    meeting.create({
      topics: meetingseries.topics,
      title: meetingseries.title,
      description: meetingseries.description,
      attendees: attendees,
      isInitialCreation: true
    }).exec(function createMeeting(err, created) {
      if (err) {
        console.log('Meeting not created' + err);
      } else {
        console.log('Created Meeting ' + JSON.stringify(created));
        meeting.publishCreate({
          id: created.id,
          topics: created.topics,
          title: created.topics,
          description: created.topics,
          attendees: created.attendees,
          isInitialCreation: created.isInitialCreation
        });
      }
    });
  },

  create: function (req, res) {

    var topics = req.param('topics');
    var attendees = req.param('attendees');
    var isInitialCreation = req.param('isInitialCreation');
    var startTime = req.param('startTime');

    if (isInitialCreation === false) {

      if (topics && attendees && isInitialCreation && startTime) {
        meeting.create({
          topics: topics,
          attendees: attendees,
          isInitialCreation: isInitialCreation,
          startTime: startTime,
        }).exec(function createMeeting(err, created) {
          if (err) {
            console.log('Meeting not created' + err);
          } else {
            console.log('Created Meeting');
            meeting.publishCreate({
              id: created.id,
              topics: created.topics,
              attendees: created.attendees,
              isInitialCreation: created.isInitialCreation,
              startTime: created.startTime,
            });
          }
        });
      }
    } else if (req.isSocket) {
      sails.log('Meeting with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meeting\'.');
    } else {
      res.send('meeting');
      console.log('Meeting not created: too few parameters');
    }
  },

  delete: function (req, res) {
    var meetingID = req.param("meetingID", null);
    if (meetingID && req.isSocket) {
      Meeting.findOne(meetingID).exec(function findMeeting(err, meetingAnswer) {
        meeting.destroy({id: meetingAnswer.id}).exec(function destroy(err) {
          if (err) {
            sails.log('Error while deleting meeting');
            res.send("Error");
          } else {
            sails.log("Successfully deleted " + meetingID);
            meeting.publishDestroy({id: meetingAnswer.id});
          }
        });
      });
    }
  },

  update: function (req, res) {

    sails.log('Update started');
    var topics = req.param('topics');
    var attendees = req.param('attendees');
    var isInitialCreation = req.param('isInitialCreation');
    var startTime = req.param('startTime');

    if (topics && attendees && isInitialCreation && startTime && req.isSocket) {
      meeting.update({
        topics: topics,
        attendees: attendees,
        isInitialCreation: isInitialCreation,
        startTime: startTime,
      }).exec(function updateMeeting(err, updated) {
        if (err) {
          console.log('Meeting not updated ' + err);
          //res.redirect('/meeting/edit');
        } else if (!updated) {
          console.log('Update error for Meeting ' + err);
          //res.redirect('/meeting/edit');
        } else {
          console.log('Updated Meeting: ' + updated.topics);
          meeting.publishUpdate({
            id: updated.id,
            topics: updated.topics,
            attendees: updated.attendees,
            isInitialCreation: updated.isInitialCreation,
            startTime: updated.startTime,
          });
        }
      });
    } else {
      res.send('meeting');
      //res.redirect('/meeting/view/'+id);
      console.log('Meeting not updated: too few parameters');
    }
  },

  view: function (req, res) {
    //meeting.watch(req);
    var id = req.param('id', null);
    id = 1;
    meeting.findOne({id: id}).populateAll().exec(function displayList(err, cre) {
      DeepPopulateService.populateDeep('meeting', cre, 'topics.todos', function (err, meeting) {
        if (err) {
          sails.log.error("ERR:", err);
        }
        console.log(JSON.stringify(meeting));
        res.response = meeting;
        res.render('meeting', {'model': meeting});
      });
    });
  },

  // viewAll: function(req,res) {
  // 	Meeting.find().exec(function displayMeetingList(err, items) {
  // 	  if (err) return res.serverError(err);
  // 	  sails.log('meeting:' + items);
  // 	  Meeting.subscribe(req.socket);
  // 	  Meeting.subscribe(req.socket, items);
  // 	  return res.view('meeting', {
  // 	    users: items,
  // 	  });
  // 	});
  // },

  subscribe: function (req, res) {
    if (req.isSocket) {
      meeting.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meeting\'.');
    }
  },

  getAttendees: function (req, res) {

  },

  shareLink: function (req, res) {

  },

  start: function (req, res) {

  },

  end: function (req, res) {
    // send summary email to everyone who provided at least email
    // delete guests who only provided name or nothing
    for (var attendee in req.attendees) {
      EmailService.sendSummary({recipientName: attendee.name, to: attendee.email, topics: req.topics});
    }
  },

};

