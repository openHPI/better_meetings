/**
 * MeetingSeriesController
 *
 * @description :: Server-side logic for managing Meetingsseries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    var admins = req.param('admins') || [req.session.me];
    var members = req.session.me;
    var title = req.param('title');
    var timer = 900;

    if (admins && title) {
      meetingseries.create({
        admins: admins,
        members: members,
        title: title,
        timer: timer
      }).exec(function createMeetingSeries(err, created) {
        if (err) {
          console.log('[bm-error] meetingseries not created: ' + err);
        } else {
          console.log('Created MeetingSeries: ' + created.title);
          meetingseries.publishCreate({
            id: created.id,
            admins: created.admins,
            members: created.members,
            title: created.title,
            timer: created.timer
          });
        }
        if (!req.isSocket) {
          res.redirect('/dashboard');
        }
      });
    } else if (req.isSocket) {
      sails.log('MeetingSeries with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'meetingseries\'.');
    } else {
      res.send('meetingseries');
      console.log('MeetingSeries not created: too few parameters');
    }
  },


  update: function (req, res) {
    var admins = req.param('admins');
    var title = req.param('title');
    var meeting = req.param('meeting');
    var url = req.param('url');
    var timer = req.param('timer');
    var members = req.param('members');
    var description = req.param('description');
    var topics = req.param('topics');
    var meetingSeriesId = req.param('id');

    sails.log('Update started');
    sails.log(req.param('title'));

    if (meetingSeriesId && admins && title && meeting && url && timer && members &&
      description && topics && req.isSocket) {
      meetingseries.update({ id: meetingSeriesId }).set({
        admins: admins,
        title: title,
        meeting: meeting,
        url: url,
        timer: timer,
        members: members,
        description: description,
        topics: topics
      }).exec(function updateMeetingSeries(err, updated) {
        if (err) {
          sails.log('MeetingSeries not updated ' + err);
        } else {
          sails.log('Updated MeetingSeries: ' + updated[0].title);

          updated[0].save(function (updateErr) {
            if (updateErr) {
              sails.log('Error while saving update to MeetingSeries ' + updated[0].title);
            } else {
              sails.log('Successfully saved updates to MeetingSeries ' + updated[0].title);
              meetingseries.publishUpdate(updated[0].id, {
                id: updated[0].id,
                admins: updated[0].admins,
                title: updated[0].title,
                meeting: updated[0].meeting,
                url: updated[0].url,
                timer: updated[0].timer,
                members: updated[0].members,
                description: updated[0].description,
                topics: updated[0].topics
              });
            }
          });
        }
      });
    } else {
      res.send('meetingseries');
      sails.log('MeetingSeries not updated: too few parameters');
    }
  },

  updateDescription: function (req, res) {
    var description = req.param('description');
    var meetingSeriesId = req.param('id');

    sails.log('Update description started');

    if (meetingSeriesId && description) {
      meetingseries.update({ id: meetingSeriesId }).set({
        description: description
      }).exec(function updateMeetingSeries(err, updated) {
        if (err) {
          sails.log('MeetingSeries not updated ' + err);
        } else {
          sails.log('Updated MeetingSeries: ' + updated[0].title);

          updated[0].save(function (updateErr) {
            if (updateErr) {
              sails.log('Error while saving update to MeetingSeries ' + updated[0].title);
            } else {
              sails.log('Successfully saved updates to MeetingSeries ' + updated[0].title);
              res.send(updated[0].description);
            }
          });
        }
      });
    } else {
      res.send('meetingseries');
      sails.log('MeetingSeries not updated: too few parameters');
    }
  },

  updateTopicOrder: function (req, res) {
    var order = req.param('order');
    var meetingSeriesId = req.param('id');

    sails.log('Update started');

    if (meetingSeriesId && order) {
      meetingseries.update({ id: meetingSeriesId }).set({
        topicOrder: order
      }).exec(function updateMeetingSeries(err, updated) {
        if (err) {
          sails.log('MeetingSeries not updated ' + err);
        } else {
          sails.log('Updated MeetingSeries: ' + updated[0].title);

          updated[0].save(function (updateErr) {
            if (updateErr) {
              sails.log('Error while saving update to MeetingSeries ' + updated[0].title);
            } else {
              sails.log('Successfully saved updates to MeetingSeries ' + updated[0].title);
              meetingseries.publishUpdate(updated[0].id, {
                id: updated[0].id,
                topicOrder: updated[0].topicOrder
              });

              console.log('new topic order: ' + updated[0].topicOrder);
              console.log('new topic order: ' + updated[0].topicOrder.split('_'));
            }
          });
        }
      });
    } else {
      res.send('meetingseries');
      sails.log('MeetingSeries not updated: too few parameters');
    }
  },

  updateTimer: function (req, res) {
    var timer = req.param('timer');
    var meetingSeriesId = req.param('id');

    sails.log('Update timer started');

    if (meetingSeriesId && timer) {
      meetingseries.update({ id: meetingSeriesId }).set({
        timer: timer
      }).exec(function updateMeetingSeries(err, updated) {
        if (err) {
          sails.log('MeetingSeries not updated ' + err);
        } else {
          sails.log('Updated MeetingSeries: ' + updated[0].title);

          updated[0].save(function (updateErr) {
            if (updateErr) {
              sails.log('Error while saving update to MeetingSeries ' + updated[0].title);
            } else {
              sails.log('Successfully saved updates to MeetingSeries ' + updated[0].title);
              res.send(updated[0].timer);
              sails.log('Successfully saved updates to MeetingSeries ' + updated[0].timer);
            }
          });
        }
      });
    } else {
      res.send('meetingseries');
      sails.log('MeetingSeries not updated: too few parameters');
    }
  },

  createPerson: function (req, res) {
    var type = req.param('type');
    var email = req.param('email');
    var meetingSeriesId = req.param('id');

    console.log(req.params.all());

    if (!meetingSeriesId) {
      return res.send('no meeting series id provided');
    }

    return meetingseries.findOne(meetingSeriesId).populateAll().exec(function findSeries(errFoundSeries, foundSeries) {
      if (errFoundSeries) {
        return res.send(errFoundSeries);
      }

      if (!foundSeries) {
        return res.send('no series found');
      }

      console.log('found series @id:' + meetingSeriesId);
      return person.findOne({ email: email }).exec(function findPerson(err, foundPerson) {
        var members = foundSeries.members;
        var admins = foundSeries.admins;
        if (!members) members = [];
        if (!admins) admins = [];

        if (err) {
          return res.send(err);
        }

        if (!foundPerson) {
          return res.send('A Person with email:' + email + ' does not exist');
        }

        if (type === 'admin') {
          admins.push(foundPerson);
        }

        members.push(foundPerson);

        console.log('update with members:' + members);
        console.log('update with admins:' + admins);
        return meetingseries.update({
          id: meetingSeriesId
        }, {
          admins: admins,
          members: members
        }).exec(function () {
          console.log('finished :)');

          res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, ' +
            'pre-check=0');
          res.redirect('back');
        });
      });
    });
  },

  view: function (req, res) {
    var id = req.param('id', null);

    return meetingseries.findOne(id).populateAll().exec(function findMeetingSerien(err, cre) {
      if (err) {
        sails.log.error('ERR:', err);
      }

      if (!cre) {
        console.log('no meetingseries with id ' + id + ' found :(');
      }

      if (cre.topics.length === 0) {
        return res.view('meetingseries',
          {
            meetingseries: cre
          });
      }

      return DeepPopulateService.populateDeep('meetingseries', cre,
        'topics.todos',
        function (populateErr, item) {
          if (populateErr) {
            sails.log.error('ERR:', populateErr);
          }

          if (item.topicOrder) {
            item.topics = ItemOrderService.orderItems(item.topics, item.topicOrder);
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
      meetingseries.findOne(meetingSeriesID).exec(function findMeetingSeries(err, meetingSeriesAnswer) {
        meetingseries.destroy(
          {
            id: meetingSeriesAnswer.id
          })
          .exec(function destroy(destroyErr) {
            if (destroyErr) {
              sails.log('Error while deleting meetingseries');
              res.send('Error');
            } else {
              sails.log('Successfully deleted ' + meetingSeriesID);
              meetingseries.publishDestroy(
                {
                  id: meetingSeriesAnswer.id
                });
            }
          });
      });
    }
  },


  listen: function (req) {
    var meetingseriessToWatchFor = [];
    var item;

    if (req.isSocket) {
      meetingseries.watch(req);
      meetingseries.find({}).exec(function (err, result) {
        if (!err) {
          meetingseriessToWatchFor = [];
          for (item in result) {
            if (result.hasOwnProperty(item)) {
              console.log(result[item].id);
              meetingseriessToWatchFor.push(result[item].id);
            }
          }
          meetingseries.subscribe(req, meetingseriessToWatchFor);
        } else {
          sails.log(err);
        }
      });
      console.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'meetingseries\'.');
    }
  }
};
