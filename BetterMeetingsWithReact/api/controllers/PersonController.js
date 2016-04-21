/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  // if just email + name are provided, it's a guest
  create: function (req, res) {
    var name = req.param('name');
    var password = req.param('password');
    var email = req.param('email');

    sails.log('Creation of Person started');
    sails.log(req.param('name'));

    if (name && password && email) {
      person.create(
        {
          name: name,
          password: password,
          email: email
        })
        .exec(function createPerson(err, created) {
          if (err) {
            console.log('Person not created' + err);
          } else {
            console.log('Created Person: ' + created.name);
            person.publishCreate(
              {
                id: created.id,
                name: created.name,
                password: created.password,
                email: created.email
              });
          }
        });
    } else if (name && email) {
      person.create(
        {
          name: name,
          email: email
        })
        .exec(function createPerson(err, created) {
          if (err) {
            console.log('Person not created' + err);
          } else {
            console.log('Created Person: ' + created.name);
            person.publishCreate(
              {
                id: created.id,
                name: created.name,
                email: created.email
              });
          }
        });
    } else if (email) {
      person.create(
        {
          email: email
        })
        .exec(function createPerson(err, created) {
          if (err) {
            console.log('Person not created' + err);
          } else {
            console.log('Created Person: ' + created.name);
            person.publishCreate(
              {
                id: created.id,
                email: created.email
              });
          }
        });
    } else if (name) {
      person.create(
        {
          name: name
        })
        .exec(function createGuestPerson(err, created) {
          if (err) {
            console.log('Guest-Person not created' + err);
          } else {
            console.log('Created Guest-Person: ' + created.name);
            person.publishCreate(
              {
                id: created.id,
                name: created.name
              });
          }
        });
    } else {
      res.send('person');
      console.log('Person not created: too few parameters');
    }
  },


  view: function (req, res) {
    var id = req.param('id', null);
    person.findOne(id).exec(function displayList(err, items) {
      console.log(items);
      res.response = items;
      res.render('person',
        {
          model: 'person'
        });
    });
  },

  getCurrent: function (req, res) {
    var user;

    if (req.session.me) {
      user = {
        id: req.session.me.id,
        name: req.session.me.name,
        email: req.session.me.email,
        isAdmin: req.session.me.isAdmin
      };

      res.send(
        {
          user: user
        });
    } else {
      res.send(
        {
          user: null
        });
    }
  },

  viewAll: function (req, res) {
    person.find().exec(function displayPersonList(err, items) {
      if (err) return res.serverError(err);
      sails.log('person:' + items);
      return res.view('person',
        {
          users: items
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


  update: function (req, res) {
    var name = req.param('name');
    var password = req.param('password');
    var email = req.param('email');
    var todos = req.param('todos');
    var assignedMeetings = req.param('assignedMeetings');
    var createdMeetings = req.param('createdMeetings');
    var isAdmin = req.param('isAdmin');
    var personId = req.param('id');

    sails.log('Update started');
    sails.log(req.param('name'));

    if (personId && name && password && email && todos && assignedMeetings &&
      createdMeetings && isAdmin !== null && req.isSocket) {
      person.update({ id: personId }).set({
        name: name,
        password: password,
        email: email,
        todos: todos,
        assignedMeetings: assignedMeetings,
        createdMeetings: createdMeetings,
        isAdmin: isAdmin
      }).exec(function updatePerson(err, updated) {
        if (err) {
          sails.log('Person not updated ' + err);
        } else {
          sails.log('Updated Person: ' + updated[0].name);
          updated[0].save(function (saveErr) {
            if (saveErr) {
              sails.log('Error while saving update to Person ' + updated[0].title);
            } else {
              sails.log('Successfully saved updates to Person ' + updated[0].title);
            }
          });
          person.publishUpdate(updated[0].id, {
            id: updated[0].id,
            name: updated[0].name,
            password: updated[0].password,
            email: updated[0].email,
            todos: updated[0].todos,
            assignedMeetings: updated[0].assignedMeetings,
            createdMeetings: updated[0].createdMeetings,
            isAdmin: updated[0].isAdmin
          });
        }
      });
    } else {
      res.send('person');
      sails.log('Person not updated: too few parameters');
    }
  },

  assignTodo: function (res, req) {
    var personId = req.param('id');
    var todo = req.param('todo');
    var todos = [];

    if (email && todo) {
      person.findOne(personId).exec(function foundPerson(err, foundPerson) {
        todos = foundPerson.todos;
      });

      if(todos.indexOf(todo) === -1) {

        person.update({ id: personId }).set({
          todos:  todos.push(todo);
        }).exec(function updatePerson(err, updated) {
          if (err) {
            sails.log('Person not updated ' + err);
          } else {
            sails.log('Updated Person: ' + updated[0].name);
            updated[0].save(function (saveErr) {
              if (saveErr) {
                sails.log('Error while saving update to Person ' + updated[0].title);
              } else {
                sails.log('Successfully saved updates to Person ' + updated[0].title);
              }
            });
          }
        });
      }
    } else {
      res.send('person');
      sails.log('Person not updated: too few parameters');
    }

  },

  login: function (req, res) {
    var name = req.param('name');
    var email = req.param('email');
    var password = req.param('password');

    if (typeof password === 'undefined' || password === '') {
      if (typeof email === 'undefined' || email === '') {
        return res.badRequest('Es wird Ihre E-Mail Adresse benötigt!');
      }

      if (typeof name === 'undefined' || name === '') {
        return this.loginEmail(req, res);
      }

      return this.loginGuest(req, res);
    }

    if (typeof email === 'undefined' || email === '') {
      return res.badRequest('Es wird Ihre E-Mail Adresse benötigt!');
    }

    return this.loginAdmin(req, res);
  },

  loginGuest: function (req, res) {
    var name = req.param('name');
    var email = req.param('email');
    var redirect = req.param('redirect');
    var successRedirect = '/dashboard';
    if (redirect) {
      successRedirect = redirect;
    }

    console.log('login with name');

    person.attemptLoginEmail(
      { email: email },
      function (err, user) {
        if (!user) {
          return person.attemptLoginGuestOrCreate(
            {
              email: email,
              name: name
            },
            function (loginErr, cre) {
              if (loginErr) return res.negotiate(loginErr);

              if (!cre) {
                console.log('login guest failed');

                if (req.wantsJSON) {
                  return res.badRequest(
                    'Invalid email/name combination.');
                }
                return res.view('login/login', { redirect: redirect });
              }

              return person.findOne({ email: cre.email }).populateAll()
                .exec(function foundPerson(personFoundErr, person) {
                  console.log('login guest successfully');

                  req.session.me = {
                    id: person.id,
                    name: person.name,
                    email: person.email,
                    isAdmin: person.isAdmin,
                    todos: person.todos,
                    createdMeetings: person.createdMeetings,
                    assignedMeetings: person.assignedMeetings
                  };

                  if (req.wantsJSON || !successRedirect) {
                    return res.ok();
                  }

                  return res.redirect(successRedirect);
                });
            });
        }

        if (user.isAdmin) {
          return res.view('login/admin', { email: email, redirect: redirect });
        }

        return res.view('login/login', { redirect: redirect });
      });
  },


  loginEmail: function (req, res) {
    var email = req.param('email');
    var redirect = req.param('redirect');
    var successRedirect = '/dashboard';
    if (redirect) {
      successRedirect = redirect;
    }

    console.log('login with email');

    person.attemptLoginEmail(
      {
        email: email
      },
      function (err, person) {
        if (err) return res.negotiate(err);

        if (!person) {
          // start name modal
          return res.view('login/guest', { email: email, redirect: redirect });
        }

        if (person.isAdmin) {
          // start admin modal
          return res.view('login/admin', { email: email, redirect: redirect });
        }

        req.session.me = {
          id: person.id,
          name: person.name,
          email: person.email,
          isAdmin: person.isAdmin,
          todos: person.todos,
          createdMeetings: person.createdMeetings,
          assignedMeetings: person.assignedMeetings
        };

        return res.redirect(successRedirect);
      });
  },


  loginAdmin: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    var redirect = req.param('redirect');
    var successRedirect = '/dashboard';
    if (redirect) {
      successRedirect = redirect;
    }
    console.log('login with password');

    person.attemptLoginAdmin(
      {
        email: email,
        password: password
      },
      function (err, person) {
        if (err) return res.negotiate(err);

        if (!person) {
          // start name modal
          return res.view('login/admin', { email: email, redirect: redirect });
        }

        req.session.me = {
          id: person.id,
          name: person.name,
          email: person.email,
          isAdmin: person.isAdmin,
          todos: person.todos,
          createdMeetings: person.createdMeetings,
          assignedMeetings: person.assignedMeetings
        };

        console.log(successRedirect);
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
      },
      function (err, cre) {
        if (err) return res.negotiate(err);

        return person.findOne({ email: cre.email }).populateAll().exec(function foundPerson(personFindErr, person) {
          if (personFindErr) return res.negotiate(personFindErr);

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

  listen: function (req) {

    if (req.isSocket) {
      person.watch(req);

      person.find({}).exec(function (err, result) {
        if (!err) {
          var personsToWatchFor = [];
          for (var item in result) {
            console.log(result[item].id);
            personsToWatchFor.push(result[item].id);
          }
          person.subscribe(req, personsToWatchFor);
        } else {
          sails.log("Fehler");
        }
      });
      console.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'person\'.');
    }
  }
};
