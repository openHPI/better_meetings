/**
 * ExampleDataService
 *
 */

module.exports = {

  loadAll: function (req, res) {
    console.log('load all dummy data');
  },

  conf: {
    person: {
      email_admin1: 'ajay.kesar@student.hpi.de',
      email_admin2: 'ajaykes@hotmail.de',
      email_member1: 'kesar@uni-potsdam.de'
    },
    meetingseries: {
      title: 'Internet-Technologien und Systeme - Meeting',
      description: 'Besprechung aller wichtigen Projekte und Aufgaben'
    },

    topics: [
      {
        title: 'Verlauf Webprogrammierungs Seminar',
        description: 'Überblick über alle Gruppen / Demo Vorträge',
        done: false,
      },
      {
        title: 'Neue Technologien',
        description: 'Was gibt es neues in der Welt des Internets?',
        done: false,
      },
      {
        title: 'Ausblick',
        description: 'Punkte für die nächste Woche',
        done: false,
      }
    ],
    todos: [
      {
        title: 'Gruppenkurzfassung',
        description: 'Vorstellung aller Gruppen und ihrer Projekte',
        assignee: "Alexander",
      },
      {
        title: 'Nutzung des BetterMeeting Tools',
        description: 'Warum ist das Tool so gut und hilft auf professionellen Niveau?',
        assignee: "Emma"
      },
      {
        title: 'Demo-Präsentationen',
        description: 'Planung der Veranstaltung',
        assignee: "Julius"
      }
    ],
  },

  generateExamplePersons: function (req, res) {

    var person1 = {
      'email': this.conf.person.email_admin1,
      'password': 'password',
      'name': 'Alexander',
      'isAdmin': true
    };
    var person2 = {
      'email': this.conf.person.email_admin2,
      'password': 'password',
      'name': 'Emma',
      'isAdmin': true
    };
    var person3 = {
      'email': this.conf.person.email_member1,
      'password': 'password',
      'name': 'Julius',
      'isAdmin': false
    };
    var persons = [person1, person2, person3];

    for (var i = 0; i < 3; i++) {
      var name = persons[i].name;
      var password = persons[i].password;
      var email = persons[i].email;
      var isAdmin = persons[i].isAdmin;

      person.findOrCreate({
        name: name,
        password: password,
        email: email,
        isAdmin: isAdmin
      }).exec(function createPerson(err, cre) {
        if (err) {
          sails.log('person not created' + err);
        } else {
          sails.log('person created: ' + JSON.stringify(cre));
        }
      })
    }
  },

  generateExampleMeetingSeries: function (req, res) {

    var admins = [];
    var members = [];
    var title = this.conf.meetingseries.title;
    var description = this.conf.meetingseries.description;
    var timer = 3600;

    var email1 = this.conf.person.email_admin1;
    var email2 = this.conf.person.email_admin2;
    var email3 = this.conf.person.email_member1;

    person.findOne({
      email: email1
    }).exec(function findPerson(err, admin1) {
      if (err) {
      } else {
        if (!admin1) {
        } else {
          admins.push(admin1);
        }
      }

      person.findOne({
        email: email2
      }).exec(function findPerson(err, admin2) {
        if (err) {
        } else {
          if (!admin2) {
          } else {
            admins.push(admin2);
          }
        }
        person.findOne({
          email: email3
        }).exec(function findPerson(err, member1) {
          if (err) {
          } else {
            if (!member1) {
            } else {
              members.push(member1);
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
                  timer: timer
                }).exec(function createMeetingSeries(err, series) {
                  if (err) {
                    sails.log('MeetingSeries not created' + err);
                  } else {
                    sails.log('MeetingSeries created: ' + JSON.stringify(series));
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
    var topic1 = {
      'title': this.conf.topics[0].title,
      'description': this.conf.topics[0].description,
      'done': this.conf.topics[0].done,
    };
    var topic2 = {
      'title': this.conf.topics[1].title,
      'description': this.conf.topics[1].description,
      'done': this.conf.topics[1].done,
    };
    var topic3 = {
      'title': this.conf.topics[2].title,
      'description': this.conf.topics[2].description,
      'done': this.conf.topics[2].done,
    };

    var topics = [topic1, topic2, topic3];

    meetingseries.findOne({
      title: this.conf.meetingseries.title,
      description: this.conf.meetingseries.description
    }).exec(function findMeetingSeries(err, cre) {
      if (err) {
        sails.log('Topics not created' + err);
      } else {
        if (!cre) {
          sails.log('Topics not created' + err);
        } else {

          for (var i = 0; i < 3; i++) {
            var meetingseries = cre;
            var title = topics[i].title;
            var description = topics[i].description;
            var done = topics[i].done;

            agendaitem.findOrCreate({
              meetingseries: meetingseries,
              title: title,
              description: description,
              done: done,
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
    var todo1 = {
      'done': false,
      'title': this.conf.todos[0].title,
      'description': this.conf.todos[0].description,
      'assignee': this.conf.todos[0].assignee,
      'important': true,
    };
    var todo2 = {
      'done': false,
      'title': this.conf.todos[1].title,
      'description': this.conf.todos[1].description,
      'assignee': this.conf.todos[1].assignee,
      'important': false,
    };
    var todo3 = {
      'done': true,
      'title': this.conf.todos[2].title,
      'description': this.conf.todos[2].description,
      //'assignee': this.conf.todos[2].assignee,
      'important': false,
    };

    var todos = [todo1, todo2, todo3];

    agendaitem.findOne({
      'title': this.conf.topics[0].title,
      'description': this.conf.topics[0].description
    }).exec(function findAgendaItem(err, agendaItem) {
      if (err) {
        sails.log('Todos not created' + err);
      } else {
        if (!agendaItem) {
          sails.log('Todos not created' + err);
        } else {
          for (var i = 0; i < 3; i++) {
            var owner = agendaItem;
            var done = todos[i].done;
            var title = todos[i].title;
            var description = todos[i].description;
            var assignee = todos[i].assignee;
            var important = todos[i].important;

            todoitem.findOrCreate({
              owner: owner,
              done: done,
              title: title,
              description: description,
              assignee: assignee,
              important: important,
            }).exec(function createTodoItems(err, cre) {
              if (err) {
                sails.log('TodoItem not created ' + err);
              } else {
                sails.log('TodoItem created: ' + JSON.stringify(cre));
              }
            })
          }
        }
      }
    });
  }
}
