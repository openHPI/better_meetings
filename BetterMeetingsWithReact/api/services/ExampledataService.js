/**
 * ExampledataService
 *
 */

module.exports = {

  loadAll: function (req, res) {
    console.log("load all dummy data");
  },

  generateExamplePersons: function (req, res, cb) {

    var person1 = {
      'email': 'test1@hpi.de',
      'password': 'password',
      'name': 'TestAdmin 1',
    };
    var person2 = {
      'email': 'test2@hpi.de',
      'password': 'password',
      'name': 'TestAdmin 2',
    };
    var person3 = {
      'email': 'test3@hpi.de',
      'password': 'password',
      'name': 'TestAdmin 3',
    };
    var persons = [person1, person2, person3];

    for (var i = 0; i < 3; i++) {
      var name = persons[i].name;
      var password = persons[i].password;
      var email = persons[i].email;

      person.findOrCreate({
        name: name,
        password: password,
        email: email
      }).exec(function createPerson(err, cre) {
        if (err) {
          sails.log('person not created' + err);
        } else {
          sails.log('person created: ' + cre.name);
          sails.log('log in with: email: ' + cre.email + ' and password: ' + cre.password);
        }
      })

    }
    //return res.send('Toll');
  },

  generateExampleTopics: function (req, res) {

    meetingseries.findOne({
      title: 'Testmeeting',
      description: 'Lorem ipsum dolor.'
    }).exec(function findMeetingSeries(err, cre) {
      if (err) {
        sails.log('Topics not created' + err);
      } else {
        if (!cre) {
          sails.log('Topics not created' + err);
        } else {

          var topic1 = {
            'meetingseries': cre,
            'title': 'Topic 1',
            'description': 'Lorem Ipsum Dolor.'
          };
          var topic2 = {
            'meetingseries': cre,
            'title': 'Topic 2',
            'description': 'Lorem Ipsum Dolor.'
          };
          var topic3 = {
            'meetingseries': cre,
            'title': 'Topic 3',
            'description': 'Lorem Ipsum Dolor.'
          };

          var topics = [topic1, topic2, topic3];

          for (var i = 0; i < 3; i++) {
            var meetingseries = topics[i].meetingseries;
            var title = topics[i].title;
            var description = topics[i].description;

            agendaitem.findOrCreate({
              meetingseries: meetingseries,
              title: title,
              description: description
            }).exec(function createAgendaItems(err, cre) {
              if (err) {
                sails.log('AgendaItem not created' + err);
              } else {
                sails.log('AgendaItem created: ' + cre.title);
              }
            })
          }

        }
      }
    });
    //return res.send('Toll');
  },

  generateExampleMeeting: function (req, res) {

    var admins = [];
    var title = 'Testmeeting';
    var description = 'Lorem ipsum dolor.';
    var url = UrlService.generateurl();
    var timer = 600;

    person.findOne({
      email: 'test1@hpi.de'
    }).exec(function findPerson(err, admin1) {
      if (err) {
      } else {
        if (!admin1) {
        } else {
          admins.push(admin1);
        }
      }
      person.findOne({
        email: 'test2@hpi.de'
      }).exec(function findPerson(err, admin2) {
        if (err) {
        } else {
          if (!admin2) {
          } else {
            admins.push(admin2);
          }
        }
        person.findOne({
          email: 'test3@hpi.de'
        }).exec(function findPerson(err, admin3) {
          if (err) {
          } else {
            if (!admin3) {
            } else {
              admins.push(admin3);
            }
          }

          meetingseries.findOne({
            title: title,
            description: description
          }).exec(function findMeetingSeries(err, cre) {
            if (err) {
              sails.log('MeetingSeries not created' + err);
            } else {
              if (!cre) {
                meetingseries.create({
                  title: title,
                  description: description,
                  admins: admins,
                  //meeting: meeting,
                  url: url,
                  timer: timer
                }).exec(function createMeetingSeries(err, series) {
                  if (err) {
                    sails.log('MeetingSeries not created' + err);
                  } else {
                    sails.log('MeetingSeries created: ' + series.title);
                    console.log('/meetingseries/' + series.url);
                  }
                });
              } else {
                sails.log('MeetingSeries created: ' + cre.title);
                console.log('/meetingseries/' + cre.url);
              }
            }
          });
        });
      });
    });
  },

};
