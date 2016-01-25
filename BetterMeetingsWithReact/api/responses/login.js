/**
 * res.login([inputs])
 *
 * @param {String} inputs.username
 * @param {String} inputs.password
 *
 * @description :: Log the requesting user in using a passport strategy
 * @help        :: See http://links.sailsjs.org/docs/responses
 */

module.exports = function login(inputs) {
  inputs = inputs || {};

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Look up the user
  person.attemptLogin({
    email: inputs.email,
    password: inputs.password
  }, function (err, person) {
    if (err) return res.negotiate(err);
    if (!person) {

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the person agent know the login was successful.
      // (also do this if no `invalidRedirect` was provided)
      if (req.wantsJSON || !inputs.invalidRedirect) {
        return res.badRequest('Invalid username/password combination.');
      }
      // Otherwise if this is an HTML-wanting browser, redirect to /login.
      return res.redirect(inputs.invalidRedirect);
    }

    // "Remember" the person in the session
    // Subsequent requests from this person agent will have `req.session.me` set.
    req.session.me = person;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the person agent know the login was successful.
    // (also do this if no `successRedirect` was provided)
    if (req.wantsJSON || !inputs.successRedirect) {
      return res.ok();
    }

    // Otherwise if this is an HTML-wanting browser, redirect to /.
    return res.redirect(inputs.successRedirect);
  });

};
