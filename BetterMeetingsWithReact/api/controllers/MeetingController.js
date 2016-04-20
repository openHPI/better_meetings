/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  createFromSeries: function (req, res) {
    var id = req.param('meetingseries');
    var topics = [];
    var scheduledAt = req.param('scheduledAt');
    var self = this;
    var i;
    var index;
    var content;
    var distinctPersons;

    meetingseries.findOne(id).populateAll().exec(function findMeetingSerien(errMeetingFind, series) {
      if (errMeetingFind) {
        sails.log.error('ERR:', errMeetingFind);
      }

      if (!series) {
        console.log('no meetingseries with id ' + id + ' found :(');
        return;
      }

      if (series) {
        UrlService.generate_unique_url(
          function generateUrl(url) {
            var params = Object.keys(req.allParams());
            var order;

            for (i = 0; i < params.length; i++) {
              if (params[i].startsWith('topic')) {
                index = parseInt(params[i].substring(5), 10);
                topics.push(series.topics[index]);
                if (order) {
                  order += '_' + series.topics[index].id;
                } else {
                  order = series.topics[index].id;
                }
              }
            }

            console.log(params);
            console.log(topics);
            console.log(order);

            meeting.create(
              {
                title: series.title,
                description: series.description,
                topics: topics,
                topicOrder: order,
                admins: series.admins,
                attendees: series.admins.concat(series.members),
                isInitialCreation: true,
                scheduledAt: scheduledAt,
                done: false,
                timer: series.timer,
                url: url,
                series: series
              })
              .exec(function createMeeting(err, created) {
                if (err) {
                  console.log('Meeting not created' + err);
                } else {
                  console.log('Created Meeting @id:' + created.id);
                  meeting.publishCreate(
                    {
                      id: created.id,
                      topics: created.topics,
                      topicOrder: created.topicOrder,
                      title: created.topics,
                      description: created.topics,
                      admins: created.admins,
                      attendees: created.attendees,
                      isInitialCreation: created.isInitialCreation,
                      scheduledAt: created.scheduledAt,
                      done: created.status,
                      timer: created.timer,
                      url: created.url,
                      series: created.series
                    });

                  content = EmailService.computeInviteEmailContent(created.url, series.title);
                  distinctPersons = self.arrayUnion(series.admins, series.members);

                  for (i in distinctPersons) {
                    if (distinctPersons[i].email !== null) {
                      EmailService.sendInvitation({
                        recipientName: distinctPersons[i].name,
                        to: distinctPersons[i].email,
                        content: content
                      });
                    }
                  }
                  res.redirect('meetingseries/view/' + created.series);
                }
              });
          }
        );
      }
    });
  },

  create: function (req, res) {
    var topics = req.param('topics');
    var attendees = req.param('attendees');
    var isInitialCreation = req.param('isInitialCreation');
    var scheduledAt = req.param('scheduledAt');
    var meetingCreatingAdmin = req.session.me;

    console.log('req.session.me: ' + meetingCreatingAdmin);
    attendees.push(meetingCreatingAdmin);

    if (isInitialCreation === false) {
      if (topics && attendees && isInitialCreation && scheduledAt) {
        meeting.create(
          {
            topics: topics,
            attendees: attendees,
            isInitialCreation: isInitialCreation,
            scheduledAt: scheduledAt
          })
          .exec(function createMeeting(err, created) {
            if (err) {
              console.log('Meeting not created' + err);
            } else {
              console.log('Created Meeting');
              meeting.publishCreate(
                {
                  id: created.id,
                  topics: created.topics,
                  attendees: created.attendees,
                  isInitialCreation: created.isInitialCreation,
                  scheduledAt: created.scheduledAt
                });
            }
          });
      }
    } else if (req.isSocket) {
      sails.log('Meeting with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'meeting\'.');
    } else {
      res.send('meeting');
      console.log('Meeting not created: too few parameters');
    }
  },


  delete: function (req, res) {
    var meetingID = req.param('id', null);
    if (meetingID && req.isSocket) {
      meeting.destroy(
        {
          id: meetingID
        })
        .exec(function destroy(err) {
          if (err) {
            sails.log('Error while deleting meeting');
            res.send('Error');
          } else {
            sails.log('Successfully deleted ' + meetingID);
            meeting.publishDestroy(
              {
                id: meetingID
              });
          }
        });
    }
  },


  update: function (req, res) {
    var topics = req.param('topics');
    var attendees = req.param('attendees');
    var isInitialCreation = req.param('isInitialCreation');
    var startTime = req.param('startTime');
    var meetingId = req.param('id');
    var url = req.param('url');

    sails.log('Update started');

    if (meetingId && topics && attendees && isInitialCreation !== null && startTime && url && req.isSocket) {
      meeting
        .update({ id: meetingId }).set({
          topics: topics,
          attendees: attendees,
          isInitialCreation: isInitialCreation,
          startTime: startTime,
          url: url
        })
        .exec(function updateMeeting(errUpdateMeeting, updated) {
          if (errUpdateMeeting) {
            sails.log('Meeting not updated ' + errUpdateMeeting);
          } else {
            sails.log('Updated Meeting: ' + updated[0].title);

            updated[0].save(function (err) {
              if (err) {
                sails.log('Error while saving update to Meeting ' + updated[0].title);
              } else {
                sails.log('Successfully saved updates to Meeting ' + updated[0].title);
                meeting.publishUpdate(updated[0].id, {
                  id: updated[0].id,
                  topics: updated[0].topics,
                  attendees: updated[0].attendees,
                  isInitialCreation: updated[0].isInitialCreation,
                  startTime: updated[0].startTime,
                  url: updated[0].url
                });
              }
            });
          }
        });
    } else {
      res.send('meeting');
      sails.log('Meeting not updated: too few parameters');
    }
  },


  view: function (req, res) {
    return res.view('meeting');
  },


  get: function (req, res) {
    var url;
    var path;
    var segments;
    var qrcode;

    if (req.wantsJSON) {
      path = req.socket.request.headers.referer;
      segments = path.split('/');
      if (segments[segments.length - 2] === 'id' && segments[segments.length -
        3] === 'meeting') {
        url = path.split('/').pop();
      }
    } else {
      url = req.param('url');
    }

    console.log('search for meeting with url: ' + url);

    meeting.findOne(
      {
        url: url
      })
      .populateAll()
      .exec(function findMeeting(errMeetingFind, cre) {
        if (errMeetingFind) {
          sails.log.error('ERR:', errMeetingFind);
        }

        if (!cre) {
          console.log('no meeting with url ' + url + ' found :(');
          return;
        }

        DeepPopulateService.populateDeep('meeting', cre, 'topics.todos',
          function (err, meeting) {
            if (err) {
              sails.log.error('ERR:', err);
            }

            qrcode = QrCodeService.renderQrCode('http://localhost:1337/meeting/id/' + meeting.url, '250');

            if (meeting.topicOrder) {
              meeting.topics = ItemOrderService.orderItems(meeting.topics, meeting.topicOrder);
            }

            res.send(
              {
                meeting: meeting,
                qrcode: qrcode
              });
          });
      });
  },


  listen: function (req) {
    var meetingsToWatchFor = [];
    var item;

    if (req.isSocket) {
      meeting.watch(req);
      meeting.find({}).exec(function (err, result) {
        if (!err) {
          for (item in result) {
            if (result.hasOwnProperty(item)) {
              console.log(result[item].id);
              meetingsToWatchFor.push(result[item].id);
            }
          }
          meeting.subscribe(req, meetingsToWatchFor);
        } else {
          sails.log(err);
        }
      });
      console.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'meeting\'.');
    }
  },


  createAttendee: function (req) {
    var name = req.param('name', null);
    var email = req.param('email', null);
    var password = req.param('password', null);
    var id = req.param('id', null);
    var input = {
      name: name,
      email: email,
      password: password,
      meeting: id
    };
    PersonService.createAttendee(input);
  },


  getAttendees: function (req, res) {
    console.log(res);
  },

  downloadSummary: function (req, res) {
    console.log(res);
  },


  shareLink: function (req, res) {
    console.log(res);
  },

  startMeeting: function (req, res) {
    var meetingId = req.param('id', null);
    var startTime = new Date();
    var self = this;
    var content;
    var distinctPersons;
    var i;

    console.log('start meeting ' + meetingId);

    return meeting.findOne(meetingId).exec(function findMeeting(err, meetingAnswer) {
      if (err) {
        sails.log.error('Error:', err);
        return null;
      }
      sails.log('Found meeting with title ' + meetingAnswer.title);

      return meetingseries.findOne(meetingAnswer.series)
        .exec(function findMeetingSeries(errFindSeries, meetingSeriesAnswer) {
          if (errFindSeries) {
            sails.log('Error: Could not find meetingseries');
            return null;
          }
          sails.log('Found meetingseries with title ' + meetingSeriesAnswer.title);

          content = EmailService.computeInviteEmailContent(meetingAnswer.url, meetingSeriesAnswer.title);
          distinctPersons = self.arrayUnion(meetingSeriesAnswer.admins, meetingSeriesAnswer.members);

          for (i in distinctPersons) {
            if (distinctPersons.hasOwnProperty(i)) {
              if (distinctPersons[i].email !== null) {
                EmailService.sendInvitation({
                  recipientName: distinctPersons[i].name,
                  to: distinctPersons[i].email,
                  content: content
                });
              }
            }
          }

          return meeting.update({ id: meetingId }).set({
            startTime: startTime,
            scheduledAt: startTime
          }).exec(function updateMeeting(errUpdateMeeting, updated) {
            if (errUpdateMeeting) {
              sails.log('Meeting not updated ' + errUpdateMeeting);
            } else {
              sails.log('Updated Meeting: ' + updated[0].title);
              updated[0].save(function (errUpdate) {
                if (errUpdate) {
                  sails.log('Error while saving update to Meeting ' + updated[0].title);
                  return null;
                }
                sails.log('Successfully saved updates to Meeting ' + updated[0].title);

                meeting.publishUpdate(updated[0].id, {
                  id: updated[0].id,
                  topics: updated[0].topics,
                  attendees: updated[0].attendees,
                  isInitialCreation: updated[0].isInitialCreation,
                  startTime: updated[0].startTime,
                  scheduledAt: updated[0].scheduledAt,
                  url: updated[0].url
                });
                PersonService.createAttendee({
                  name: req.session.me.name,
                  email: req.session.me.email,
                  password: req.session.me.password,
                  meeting: meetingId
                });

                console.log('redirect to: /meeting/id/' + updated[0].url);
                // redirect not working - don't now why
                res.redirect('/meeting/id/' + updated[0].url);
              });
            }
          });
        });
    });
  },

  endMeeting: function (req, res) {
    // send summary email to everyone who provided at least email, attendees and members
    // TODO: delete guests who only provided name or nothing
    // var distinctPersons = [...new Set([...req.attendees, ...req.members])];
    var _meeting = req.allParams();
    // console.dir(req.allParams());
    var _meetingSeriesId = _meeting.series.id;
    var _meetingSeries = null;
    var self = this;
    // sails.log('got meeting ' + _meeting.title);
    // sails.log('got meetingseries with id ' + _meetingSeriesId);

    meetingseries.findOne(_meetingSeriesId).exec(function findMeetingSeries(err, meetingSeriesAnswer) {
      if (err) {
        sails.log('Error: Could not find meetingseries');
      } else {
        sails.log('Found meetingseries with title ' + meetingSeriesAnswer.title);
        _meetingSeries = meetingSeriesAnswer;

        var distinctPersons = self.arrayUnion(_meeting.attendees, _meetingSeries.members);

        sails.log('distinct persons are');
        for (var i in distinctPersons) {
          sails.log(distinctPersons[i]);
        }

        // var content = EmailService.computeSummaryEmailContent(_meeting, "www.bettermeetings.com/meetingseries/1/globalUrlTest");
        var content = EmailService.computeSummaryEmailContent(_meeting, _meeting.url);
        // sails.log("Length of email content: " + content.length);
        sails.log('The email content is: ' + content);

        for (var i in distinctPersons) {
          // sails.log('attempting to send summary mail to: ' + distinctPersons[i].email);
          if (distinctPersons[i].email) {
            EmailService.sendSummary({
              recipientName: distinctPersons[i].name,
              to: distinctPersons[i].email,
              content: content,
              title: _meeting.title
            });
          }
        }
      }
    });
  },

  arrayUnion: function (arr1, arr2) {
    var union = arr1.concat(arr2);
    var i;
    var j;

    for (i = 0; i < union.length; i++) {
      for (j = i + 1; j < union.length; j++) {
        if (this.arePersonsEqual(union[i], union[j])) {
          union.splice(j, 1);
          j--;
        }
      }
    }
    return union;
  },

  arePersonsEqual: function (p1, p2) {
    return p1.name === p2.name || p1.email === p2.email;
  }
};
