/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  createFromSeries: function (req, res) {
    var id = req.param('series_id', null);
    var topics = [];

    meetingseries.findOne(id).populateAll().exec(function findMeetingSerien(err, series) {
      if (err) {
        sails.log.error('ERR:', err);
      }

      if (!series) {
        console.log('no meetingseries with id ' + id + ' found :(');
        return;
      }

      if (series) {
        UrlService.generate_unique_url(
          function generateUrl(url) {
            var attendees = [];
            for (var i = 0; i < series.admins.length; i++) {
              attendees.push(series.admins[i]);
            }
            for (var i = 0; i < series.members.length; i++) {
              attendees.push(series.members[i]);
            }

            var params = Object.keys(req.allParams());

            for (var i = 0; i < params.length; i++) {
              if (params[i].startsWith('topic')) {
                var index = parseInt(params[i].substring(5), 10);
                topics.push(series.topics[index]);
              }
            }

            meeting.create(
              {
                topics: topics,
                title: series.title,
                description: series.description,
                admins: series.admins,
                attendees: attendees,
                isInitialCreation: true,
                timer: series.timer,
                url: url,
                series: series
              })
              .exec(function createMeeting(err, created) {
                if (err) {
                  console.log('Meeting not created' + err);
                }
                else {
                  console.log('Created Meeting ' + JSON.stringify(created));
                  meeting.publishCreate(
                    {
                      id: created.id,
                      topics: created.topics,
                      title: created.topics,
                      description: created.topics,
                      admins: created.admins,
                      attendees: created.attendees,
                      isInitialCreation: created.isInitialCreation,
                      timer: created.timer,
                      url: created.url,
                      series: created.series
                    });
                  res.redirect('/meeting/id/' + url);
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
    var startTime = req.param('startTime');

    if (isInitialCreation === false) {

      if (topics && attendees && isInitialCreation && startTime) {
        meeting.create(
          {
            topics: topics,
            attendees: attendees,
            isInitialCreation: isInitialCreation,
            startTime: startTime,
          })
          .exec(function createMeeting(err, created) {
            if (err) {
              console.log('Meeting not created' + err);
            }
            else {
              console.log('Created Meeting');
              meeting.publishCreate(
                {
                  id: created.id,
                  topics: created.topics,
                  attendees: created.attendees,
                  isInitialCreation: created.isInitialCreation,
                  startTime: created.startTime,
                });
            }
          });
      }
    }
    else if (req.isSocket) {
      sails.log('Meeting with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'meeting\'.');
    }
    else {
      res.send('meeting');
      console.log('Meeting not created: too few parameters');
    }
  },


  delete: function (req, res) {
    var meetingID = req.param('meetingID', null);
    if (meetingID && req.isSocket) {
      meeting.findOne(meetingID).exec(function findMeeting(err, meetingAnswer) {
        meeting.destroy(
          {
            id: meetingAnswer.id
          })
          .exec(function destroy(err) {
            if (err) {
              sails.log('Error while deleting meeting');
              res.send('Error');
            }
            else {
              sails.log('Successfully deleted ' + meetingID);
              meeting.publishDestroy(
                {
                  id: meetingAnswer.id
                });
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
    var meetingId = req.param('id');
    var url = req.param('url');

    if (meetingId && topics && attendees && isInitialCreation != null && startTime && url && req.isSocket) {
      meeting
        .update({id: meetingId}).set({
          topics: topics,
          attendees: attendees,
          isInitialCreation: isInitialCreation,
          startTime: startTime,
          url: url,
        })
        .exec(function updateMeeting(err, updated) {
          if (err) {
            sails.log('Meeting not updated ' + err);
          } else {
            sails.log('Updated Meeting: ' + updated[0].title);

            updated[0].save(function (err) {
              if (err) {
                sails.log('Error while saving update to Meeting ' + updated[0].title);
              } else {
                sails.log('Successfully saved updates to Meeting ' + updated[0].title);
                todoitem.publishUpdate(updated[0].id, {
                  id: updated[0].id,
                  topics: updated[0].topics,
                  attendees: updated[0].attendees,
                  isInitialCreation: updated[0].isInitialCreation,
                  startTime: updated[0].startTime,
                  url: updated[0].url,
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
    if (req.wantsJSON) {
      var path = req.socket.request.headers.referer;
      console.log(path);

      var segments = path.split('/');
      console.log(segments);

      if (segments[segments.length - 2] === 'id' && segments[segments.length -
        3] === 'meeting') {
        url = path.split('/').pop();
      }
    }
    else {
      url = req.param('url');
    }
    console.log('search for meeting with url: ' + url);

    meeting.findOne(
      {
        url: url
      })
      .populateAll()
      .exec(function findMeeting(err, cre) {
        if (err) {
          sails.log.error('ERR:', err);
        }

        if (!cre) {
          console.log('no meeting with url ' + url + ' found :(');
          return;
        }

        console.log(cre.topics);

        DeepPopulateService.populateDeep('meeting', cre, 'topics.todos',
          function (err, meeting) {
            if (err) {
              sails.log.error('ERR:', err);
            }

            var qrcode = QrCodeService.renderQrCode('http://localhost:1337/meeting/id/' + meeting.url, '250');
            console.log(meeting.topics);

            res.send(
              {
                'meeting': meeting,
                'qrcode': qrcode
              });
          });
      });
  },


  listen: function (req, res) {
    if (req.isSocket) {
      meeting.watch(req);
      var testArray = [];
      for (var i = 1; i < 100; i++) {
        testArray.push(i);
      }
      meeting.subscribe(req, testArray);
      console.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'meeting\'.');
    }
  },


  createAttendee: function (req, res) {
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

  },


  shareLink: function (req, res) {

  },


  startMeeting: function (req, res) {

    var _meetingSeries = req.allParams();

    var link = _meetingSeries.instances[0].url;

    //var content = EmailService.computeInviteEmailContent("www.bettermeetings.com/meetingseries/1/testInvite", _meetingSeries.title);
    var content = EmailService.computeInviteEmailContent(link, _meetingSeries.title);
    for (var member in _meetingSeries.members) {
      EmailService.sendInvitation({
        recipientName: member.name,
        to: member.email,
        content: content,
      });
    }
  },


  endMeeting: function (req, res) {
    // send summary email to everyone who provided at least email, attendees and members
    // TODO: delete guests who only provided name or nothing
    //var distinctPersons = [...new Set([...req.attendees, ...req.members])];
    var _meeting = req.allParams();
    console.dir(req.allParams());
    var _meetingSeriesId = _meeting.series.id;
    var _meetingSeries = null;
    var self = this;
    sails.log('got meeting ' + _meeting.title);
    sails.log('got meetingseries with id ' + _meetingSeriesId);

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

        //var content = EmailService.computeSummaryEmailContent(_meeting, "www.bettermeetings.com/meetingseries/1/globalUrlTest");
        var content = EmailService.computeSummaryEmailContent(_meeting, _meeting.url);
        //sails.log("Length of email content: " + content.length);
        sails.log('The email content is: ' + content);

        for (var i in distinctPersons) {
          sails.log('attempting to send summary mail to: ' + distinctPersons[i].email);
          if (distinctPersons[i].email) {
            EmailService.sendSummary({
              recipientName: distinctPersons[i].name,
              to: distinctPersons[i].email,
              content: content,
              title: _meeting.title,
            });

          }
        }
      }
    });

  },

  arrayUnion: function (arr1, arr2) {
    var union = arr1.concat(arr2);

    for (var i = 0; i < union.length; i++) {
      for (var j = i + 1; j < union.length; j++) {
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
  },


};
