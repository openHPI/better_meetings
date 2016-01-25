/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
// if just email + displayname are provided, it's a guest
// if nothing is provided, it's also a guest
    create: function (req,res) {
      sails.log('Creation started');
      sails.log(req.param('displayname'));
      var displayname = req.param('displayname');
      var password = req.param('password');
      var email = req.param('email');

      if (displayname && password && email) {
        person.create({
          displayname:    displayname,
          password:       password,
          email:          email,
        }).exec( function createPerson(err,created) {
          if (err) {
            sails.log('Person not created' + err);
          } else {
            sails.log('Created Person: ' + created.displayname);
            person.publishCreate({
              id: created.id,
              displayname: created.displayname,
              password: created.password,
              email: created.email
             });

          }
        })
      } else if (req.isSocket){
             person.watch(req);
             sails.log('Person with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'person\'.');
      } else {
          res.send('person');
          console.log('Person not created: too few parameters');
      }
    },

    viewAll: function(req,res) {

      person.find().exec(function displayPersonList(err, items) {
        if (err) return res.serverError(err);

        sails.log('person:' + items);

        return res.view('person', {
          users: items,
        });
      });

    },


    delete: function(req,res) {
      var personID = req.param("personID", null);

      Person.findOne(personID).done(function(err, person) {
        person.destroy(function(err) {
          res.send("Success");
        });
      });
    },

    update: function (req,res) {

    },

    view: function(req, res) {
      Person.findOne(id).exec(function displayList(err, items) {
        console.log(items);
               res.response = items;
               res.render('person', {'model': 'Person'});

          })
    },

    displayAll: function (req,res) {
      Person.find(function storedPersons(err, persons) {
        Person.subscribe(req.socket);
        Person.subscribe(req.socket, persons);
      });
    },

    exampledata: function(req,res) {

      ExampledataService.generateExamplePersons(req,res);

      },

  /**
   * `PersonController.login()`
   */
  login: function (req, res) {

    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/',
      invalidRedirect: '/login'
    });
  },


  /**
   * `PersonController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  },


  /**
   * `PersonController.signup()`
   */
  signup: function (req, res) {

    // Attempt to signup a person using the provided parameters
    person.signup({
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password')
    }, function (err, person) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this person in as well.
      // We do this by "remembering" the person in the session.
      // Subsequent requests from this person agent will have `req.session.me` set.
      req.session.me = person;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the person agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/');
    });
  },

  createMeetingSeries: function (req, res) {
      return res.json({
        todo: 'createMeetingSeries() is not implemented yet!'
      });
  },

  deleteMeetingSeries: function (req, res) {
      return res.json({
        todo: 'deleteMeetingSeries() is not implemented yet!'
      });
  },

  readMeetingSeries: function (req, res) {
    return res.json({
      todo: 'readMeeting() is not implemented yet!'
    });
  },

  updateMeetingSeries: function (req, res) {
    return res.json({
      todo: 'updateMeeting() is not implemented yet!'
    });
  },


  /**
   * `PersonController.readMeeting()`
   */
  readMeeting: function (req, res) {
    return res.json({
      todo: 'readJourfixe() is not implemented yet!'
    });
  },

  createMeeting: function (req, res) {
      return res.json({
        todo: 'createMeeting() is not implemented yet!'
      });
  },

  deleteMeeting: function (req, res) {
      return res.json({
        todo: 'deleteMeeting() is not implemented yet!'
      });
  },

  updateMeeting: function (req, res) {
    return res.json({
      todo: 'updateJourFixe() is not implemented yet!'
    });
  },

  setAssignee: function (req, res) {
    return res.json({
      todo: 'setAssignee() is not implemented yet!'
    });
  },

  isDone: function (req, res) {
      return res.json({
        todo: 'isDone() is not implemented yet!'
      });
  },

  setDone: function (req, res) {
      return res.json({
        todo: 'setDone() is not implemented yet!'
      });
  },

  startMeeting: function (req, res) {
      return res.json({
        todo: 'startMeeting() is not implemented yet!'
      });
  },

  endMeeting: function (req, res) {
      return res.json({
        todo: 'endMeeting() is not implemented yet!'
      });
  },

  finishToDoItem: function (req, res) {
      return res.json({
        todo: 'finishToDoItem() is not implemented yet!'
      });
  },
};

