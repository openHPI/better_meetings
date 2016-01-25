/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
            sails.log('person not created' + err);
          } else {
            sails.log('person created: ' + created.displayname);
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
             console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'person\'.');
      } else {
          sails.log('person not created: few params');
      }
    },

    viewAll: function(req,res) {

      person.find().exec(function displayPersonList(err,items) {
        if (err) return res.serverError(err);

        sails.log('Admins:' + items);

        return res.view('person', {
          users: items,
        });
      });

    },


    delete: function(req,res) {

    },

    update: function (req,res) {

    },

    view: function(req, res) {

    },

    displayAll: function (req,res) {

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
      req.session.me = person.id;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the person agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/');
    });
  },

  /**
   * `PersonController.readMeetingSeries()`
   */
  readMeetingSeries: function (req, res) {
    return res.json({
      todo: 'readMeeting() is not implemented yet!'
    });
  },


  /**
   * `PersonController.updateMeetingSeries()`
   */
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


  /**
   * `PersonController.updateMeeting()`
   */
  updateMeeting: function (req, res) {
    return res.json({
      todo: 'updateJourFixe() is not implemented yet!'
    });
  }
};

