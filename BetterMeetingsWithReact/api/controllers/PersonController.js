/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
   * `PersonController.readMeeting()`
   */
  readMeeting: function (req, res) {
    return res.json({
      todo: 'readMeeting() is not implemented yet!'
    });
  },


  /**
   * `PersonController.updateMeeting()`
   */
  updateMeeting: function (req, res) {
    return res.json({
      todo: 'updateMeeting() is not implemented yet!'
    });
  },


  /**
   * `PersonController.readJourfixe()`
   */
  readJourfixe: function (req, res) {
    return res.json({
      todo: 'readJourfixe() is not implemented yet!'
    });
  },


  /**
   * `PersonController.updateJourFixe()`
   */
  updateJourFixe: function (req, res) {
    return res.json({
      todo: 'updateJourFixe() is not implemented yet!'
    });
  }
};

