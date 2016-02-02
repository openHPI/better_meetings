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
          sails.log('person created: ' + JSON.stringify(cre));
        }
      })

    }
    //return res.send('Toll');
  },

  generateExampleMeetingSeries: function (req, res) {

    var admins = [];
    var members = [];
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
              members.push(admin3);
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
                  members: members,
                  url: url,
                  timer: timer
                }).exec(function createMeetingSeries(err, series) {
                  if (err) {
                    sails.log('MeetingSeries not created' + err);
                  } else {
                    sails.log('MeetingSeries created: ' + series.title);
                  }
                });
              } else {
                sails.log('MeetingSeries created: ' + JSON.stringify(cre));
              }
            }
          });
        });
      });
    });
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
            'description': 'Lorem Dolor Ipsum .'
          };
          var topic3 = {
            'meetingseries': cre,
            'title': 'Topic 3',
            'description': 'Ipsum Lorem Dolor.'
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
                sails.log('AgendaItem created: ' + JSON.stringify(cre));
              }
            })
          }
        }
      }
    });
  },

  generateExampleTodoItems: function (req, res) {
    agendaitem.findOne({
      title: 'Topic 1',
      description: 'Lorem Ipsum Dolor.'
    }).exec(function findAgendaItem(err, agendaItem) {
      if (err) {
        sails.log('Todos not created' + err);
      } else {
        if (!agendaItem) {
          sails.log('Todos not created' + err);
        } else {
          var todo1 = {
            'done': false,
            'title': 'Todo 1',
            'description': 'Lorem Ipsum Dolor.'
          };
          var todo2 = {
            'done': false,
            'title': 'Todo 2',
            'description': 'Lorem Dolor Ipsum.'
          };
          var todo3 = {
            'done': true,
            'title': 'Todo 3',
            'description': 'Ipsum Lorem Dolor.'
          };

          var todos = [todo1, todo2, todo3];

          for (var i = 0; i < 3; i++) {
            var owner = agendaItem;
            var done = todos[i].done;
            var title = todos[i].title;
            var description = todos[i].description;

            todoitem.findOrCreate({
              owner: owner,
              done: done,
              title: title,
              description: description
            }).exec(function createTodoItems(err, cre) {
              if (err) {
                sails.log('TodoItem not created' + err);
              } else {
                sails.log('TodoItem created: ' + JSON.stringify(cre));
              }
            })
          }
        }
      }
    });
  },

  generateExampleMeeting: function (req, res) {
    meetingseries.findOne({
      title: 'Testmeeting',
      description: 'Lorem ipsum dolor.'
    }).populateAll().exec(function findMeetingSeries(err, cre) {
      if (err) {
        sails.log('Meeting not created' + err);
      } else {
        if (!cre) {
          sails.log('Meeting not created' + err);
        } else {
          sails.controllers.meeting.createFromSeries(cre);
        }
      }
    });
  }
};
