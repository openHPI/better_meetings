/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


// if just email + name are provided, it's a guest
  // if nothing is provided, it's also a guest

  create: function (req, res) {
    sails.log('Creation of Person started');
    sails.log(req.param('name'));
    var name = req.param('name');
    var password = req.param('password');
    var email = req.param('email');

    if (name && password && email) {
      person.create(
        {
          name: name,
          password: password,
          email: email,
        }).exec(function createPerson(err, created) {
        if (err) {
          console.log('Person not created' + err);
        }
        else {
          console.log('Created Person: ' + created.name);
          person.publishCreate(
            {
              id: created.id,
              name: created.name,
              password: created.password,
              email: created.email
            });

        }
      })
    }
    else if (name && email) {
      person.create(
        {
          name: name,
          email: email,
        }).exec(function createPerson(err, created) {
        if (err) {
          console.log('Person not created' + err);
        }
        else {
          console.log('Created Person: ' + created.name);
          person.publishCreate(
            {
              id: created.id,
              name: created.name,
              email: created.email,
            });
        }
      });
    }
    else if (email) {
      person.create(
        {
          email: email,
        }).exec(function createPerson(err, created) {
        if (err) {
          console.log('Person not created' + err);
        }
        else {
          console.log('Created Person: ' + created.name);
          person.publishCreate(
            {
              id: created.id,
              email: created.email,
            });
        }
      });
    }
    else if (name) {
      person.create(
        {
          name: name,
        }).exec(function createGuestPerson(err, created) {
        if (err) {
          console.log('Guest-Person not created' + err);
        }
        else {
          console.log('Created Guest-Person: ' + created.name);
          person.publishCreate(
            {
              id: created.id,
              name: created.name,
            });

        }
      });
    }
    else {
      res.send('person');
      console.log('Person not created: too few parameters');
    }
  },


  view: function (req, res) {

    var id = req.param('id', null);
    Person.findOne(id).exec(function displayList(err, items) {
      console.log(items);
      res.response = items;
      res.render('person',
        {
          'model': 'person'
        });
    });
  },

  getCurrent: function (req, res) {

    if (req.session.me) {
      var user = {
        id: req.session.me.id,
        name: req.session.me.name,
        email: req.session.me.email,
        isAdmin: req.session.me.isAdmin,
      };

      res.send(
        {
          'user': user
        });
    }
    else
      res.send(
        {
          'user': null
        });
  },

  viewAll: function (req, res) {

    person.find().exec(function displayPersonList(err, items) {
      if (err) return res.serverError(err);
      sails.log('person:' + items);
      return res.view('person',
        {
          users: items,
        });
    });

  },


  delete: function (req, res) {
    var meetingSeriesID = req.param("meetingSeriesID", null);
    if (meetingSeriesID && req.isSocket) {
      MeetingSeries.findOne(meetingSeriesID).exec(function findMeetingSeries(err, meetingSeriesAnswer) {
        meetingseries.destroy(
          {
            id: meetingSeriesAnswer.id
          }).exec(function destroy(err) {
          if (err) {
            sails.log('Error while deleting meetingseries');
            res.send("Error");
          }
          else {
            sails.log("Successfully deleted " + meetingseriesID);
            meetingseries.publishDestroy(
              {
                id: meetingSeriesAnswer.id
              });
          }
        });
      });
    }
  },


  update: function (req, res) {

    sails.log('Update started');
    sails.log(req.param('name'));
    var name = req.param('name');
    var password = req.param('password');
    var email = req.param('email');
    var todos = req.param('todos');
    var assignedMeetings = req.param('assignedMeetings');
    var createdMeetings = req.param('createdMeetings');
    var isAdmin = req.param('isAdmin');
    var id = req.param('id');

    if (id && name && password && email && todos && assignedMeetings &&
      createdMeetings && isAdmin && req.isSocket) {
      person.update(
        {
          'id': id
        },
        {
          name: name,
          password: password,
          email: email,
          todos: todos,
          assignedMeetings: assignedMeetings,
          createdMeetings: createdMeetings,
          isAdmin: isAdmin,
        }).exec(function updatePerson(err, updated) {
        if (err) {
          sails.log('Person not updated ' + err);
          //res.redirect('/person/edit');
        }
        else if (!updated) {
          sails.log('Update error for Person ' + err);
          //res.redirect('/person/edit');
        }
        else {
          sails.log('Updated Person: ' + updated.name);
          person.publishUpdate(id,
            {
              name: updated.name,
              password: updated.password,
              email: updated.email,
              todos: updated.todos,
              assignedMeetings: updated.assignedMeetings,
              createdMeetings: updated.createdMeetings,
              isAdmin: updated.isAdmin,
            });
        }
      });

    }
    else {
      res.send('person');
      //res.redirect('/person/view/'+id);
      sails.log('Person not updated: too few parameters');
    }
  },


  exampledata: function (req, res) {

    ExampledataService.generateExamplePersons(req, res);

  },


  login: function (req, res) {
    var name = req.param('name');
    var email = req.param('email');
    var password = req.param('password');

    if (typeof password === 'undefined' || password === '') {
      if (typeof email === 'undefined' || email === '') {
        return res.badRequest('Es wird Ihre E-Mail Adresse benötigt!');
      }
      else {
        if (typeof name === 'undefined' || name === '') {
          return this.loginEmail(req, res);
        }
        else {
          return this.loginGuest(req, res);
        }
      }
    }
    else {
      if (typeof email === 'undefined' || email === '') {
        return res.badRequest('Es wird Ihre E-Mail Adresse benötigt!');
      }
      else {
        return this.loginAdmin(req, res);
      }
    }
  },


  loginGuest: function (req, res) {
    console.log('login with name');

    var name = req.param('name');
    var email = req.param('email');

    var invalidRedirect = '/login';
    var successRedirect = '/dashboard';

    person.attemptLoginEmail(
      {
        email: email
      }, function (err, user) {
        if (!user) {
          person.attemptLoginGuestOrCreate(
            {
              email: email,
              name: name
            }, function (err, cre) {
              if (err) return res.negotiate(err);

              if (!cre) {
                console.log('login guest failed');

                if (req.wantsJSON || !invalidRedirect) {
                  return res.badRequest(
                    'Invalid email/name combination.');
                }
                return res.redirect(invalidRedirect);
              }

              person.findOne({email: cre.email}).populateAll().exec(function foundPerson(err, person) {
                console.log('login guest successfully');

                req.session.me = {
                  id: person.id,
                  name: person.name,
                  email: person.email,
                  isAdmin: person.isAdmin,
                  todos: person.todos,
                  createdMeetings: person.createdMeetings,
                  assignedMeetings: person.assignedMeetings,
                };

                if (req.wantsJSON || !successRedirect) {
                  return res.ok();
                }
                return res.redirect(successRedirect);
              });
            });
        }
        else {
          if (user.isAdmin) {
            return res.redirect('/login/admin/' + email);
          }
          else {
            return res.redirect('/login/login');
          }
        }
      });
  },


  loginEmail: function (req, res) {
    console.log('login with email');

    var email = req.param('email');
    var successRedirect = '/dashboard';

    person.attemptLoginEmail(
      {
        email: email
      }, function (err, person) {
        if (err) return res.negotiate(err);

        if (!person) {
          // start name modal
          return res.redirect('/login/guest/' + email);
        }

        if (person.isAdmin) {
          // start admin modal
          return res.redirect('/login/admin/' + email);
        }
        else {
          req.session.me = {
            id: person.id,
            name: person.name,
            email: person.email,
            isAdmin: person.isAdmin,
            todos: person.todos,
            createdMeetings: person.createdMeetings,
            assignedMeetings: person.assignedMeetings,
          };

          return res.redirect(successRedirect);
        }
      });
  },


  loginAdmin: function (req, res) {
    console.log('login with password');

    var email = req.param('email');
    var password = req.param('password');
    var successRedirect = '/dashboard';

    person.attemptLoginAdmin(
      {
        email: email,
        password: password
      }, function (err, person) {
        if (err) return res.negotiate(err);

        if (!person) {
          // start name modal
          return res.redirect('/login/admin/' + email);
        }

        req.session.me = {
          id: person.id,
          name: person.name,
          email: person.email,
          isAdmin: person.isAdmin,
          todos: person.todos,
          createdMeetings: person.createdMeetings,
          assignedMeetings: person.assignedMeetings,
        };

        return res.redirect(successRedirect);
      });
  },

  logout: function (req, res) {

    req.session.me = null;

    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    return res.redirect('/');
  },


  signup: function (req, res) {

    person.signup(
      {
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password')
      }, function (err, cre) {
        if (err) return res.negotiate(err);

        person.findOne({email: cre.email}).populateAll().exec(function foundPerson(err, person) {
          if (err) return res.negotiate(err);

          req.session.me = person;

          if (req.wantsJSON) {
            return res.ok('Signup successful!');
          }

          return res.redirect('/');
        });
      });
  },


  createMeetingSeries: function (req, res) {
    return res.json(
      {
        todo: 'createMeetingSeries() is not implemented yet!'
      });
  },


  deleteMeetingSeries: function (req, res) {
    return res.json(
      {
        todo: 'deleteMeetingSeries() is not implemented yet!'
      });
  },


  readMeetingSeries: function (req, res) {
    return res.json(
      {
        todo: 'readMeeting() is not implemented yet!'
      });
  },


  updateMeetingSeries: function (req, res) {
    return res.json(
      {
        todo: 'updateMeeting() is not implemented yet!'
      });
  },

  readMeeting: function (req, res) {
    return res.json(
      {
        todo: 'readJourfixe() is not implemented yet!'
      });
  },


  createMeeting: function (req, res) {
    return res.json(
      {
        todo: 'createMeeting() is not implemented yet!'
      });
  },


  deleteMeeting: function (req, res) {
    return res.json(
      {
        todo: 'deleteMeeting() is not implemented yet!'
      });
  },


  updateMeeting: function (req, res) {
    return res.json(
      {
        todo: 'updateJourFixe() is not implemented yet!'
      });
  },


  setAssignee: function (req, res) {
    return res.json(
      {
        todo: 'setAssignee() is not implemented yet!'
      });
  },


  isDone: function (req, res) {
    return res.json(
      {
        todo: 'isDone() is not implemented yet!'
      });
  },


  setDone: function (req, res) {
    return res.json(
      {
        todo: 'setDone() is not implemented yet!'
      });
  },


  startMeeting: function (req, res) {
    return res.json(
      {
        todo: 'startMeeting() is not implemented yet!'
      });
  },


  endMeeting: function (req, res) {
    return res.json(
      {
        todo: 'endMeeting() is not implemented yet!'
      });
  },


  finishToDoItem: function (req, res) {
    return res.json(
      {
        todo: 'finishToDoItem() is not implemented yet!'
      });
  },


  subscribe: function (req, res) {
    if (req.isSocket) {
      person.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'person\'.');
    }
  }
};
