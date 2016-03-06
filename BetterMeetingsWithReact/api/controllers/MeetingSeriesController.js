/**
 * MeetingSeriesController
 *
 * @description :: Server-side logic for managing Meetingsseries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    var admins = req.param('admins') || [req.session.me];
    var title = req.param('title');
    var timer = 900;

    if (admins && title) {
      meetingseries.create({
        admins: admins,
        title: title,
        timer: timer,
      }).exec(function createMeetingSeries(err, created) {
        if (err) {
          console.log('[bm-error] meetingseries not created: ' + err);
        } else {
          console.log('Created MeetingSeries: ' + created.title);
          meetingseries.publishCreate({
            id: created.id,
            admins: created.admins,
            title: created.title,
            timer: created.timer,
          });
        }
        if (!req.isSocket) {
          res.redirect('/dashboard');
        }
      });
    }
    else if (req.isSocket) {
      sails.log('MeetingSeries with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'meetingseries\'.');
    }
    else {
      res.send('meetingseries');
      console.log('MeetingSeries not created: too few parameters');
    }
  },


  update: function (req, res) {
    sails.log('Update started');
    sails.log(req.param('title'));
    var admins = req.param('admins');
    var title = req.param('title');
    var meeting = req.param('meeting');
    var url = req.param('url');
    var timer = req.param('timer');
    var members = req.param('members');
    var description = req.param('description');
    var topics = req.param('topics');
    var id = req.param('id');

    if (id && admins && title && meeting && url && timer && members &&
      description && topics && req.isSocket) {
      meetingseries.update(
        {
          'id': id
        },
        {
          admins: admins,
          title: title,
          meeting: meeting,
          url: url,
          timer: timer,
          members: members,
          description: description,
          topics: topics
        })
        .exec(function updateMeetingSeries(err, updated) {
          if (err) {
            sails.log('MeetingSeries not updated ' + err);
            //res.redirect('/meetingseries/edit');
          }
          else if (!updated) {
            sails.log('Update error for MeetingSeries ' + err);
            //res.redirect('/meetingseries/edit');
          }
          else {
            sails.log('Updated MeetingSeries: ' + updated.title);
            meetingseries.publishUpdate(id,
              {
                admins: updated.admins,
                title: updated.title,
                meeting: updated.meeting,
                url: updated.url,
                timer: updated.timer,
                members: updated.members,
                description: updated.description,
                topics: updated.topics
              });
          }
        });
    }
    else {
      res.send('meetingseries');
      //res.redirect('/meetingseries/view/'+id);
      sails.log('MeetingSeries not updated: too few parameters');
    }
  },


  view: function (req, res) {
    var id = req.param('id', null);
    meetingseries.findOne(id).populateAll().exec(function findMeetingSerien(err, cre) {
      if (err) {
        sails.log.error('ERR:', err);
      }

      if (!cre) {
        console.log('no meetingseries with id ' + id + ' found :(');
        return;
      }

      if (cre.topics.length == 0) {
        return res.view('meetingseries',
          {
            meetingseries: cre
          });
      }

      DeepPopulateService.populateDeep('meetingseries', cre,
        'topics.todos',
        function (err, item) {
          if (err) {
            sails.log.error('ERR:', err);
          }

          return res.view('meetingseries',
            {
              meetingseries: item
            });
        });

    });
  },


  delete: function (req, res) {
    var meetingSeriesID = req.param('meetingSeriesID', null);
    if (meetingSeriesID && req.isSocket) {
      MeetingSeries.findOne(meetingSeriesID).exec(function findMeetingSeries(err, meetingSeriesAnswer) {
        meetingseries.destroy(
          {
            id: meetingSeriesAnswer.id
          })
          .exec(function destroy(err) {
            if (err) {
              sails.log('Error while deleting meetingseries');
              res.send('Error');
            }
            else {
              sails.log('Successfully deleted ' + meetingseriesID);
              meetingseries.publishDestroy(
                {
                  id: meetingSeriesAnswer.id
                });
            }
          });
      });
    }
  },


  listen: function (req, res) {
    if (req.isSocket) {
      meetingseries.watch(req);
      console.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'meetingseries\'.');
    }
  },
};
