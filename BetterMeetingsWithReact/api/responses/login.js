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
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  inputs = inputs || {};

  if (typeof inputs.password === 'undefined' || inputs.password === '') {
    if (typeof inputs.email === 'undefined' || inputs.email === '') {
      return res.badRequest('Es wird Ihre E-Mail Adresse benötigt!');
    }

    if (typeof inputs.name === 'undefined' || inputs.name === '') {
      return res.redirect('/login/name');
    }

    sails.controllers.person.createGuest(req, res);
    return person.attemptLoginGuest({
      email: inputs.email,
      name: inputs.name
    }, function (err, person) {
      if (err) return res.negotiate(err);

      if (!person) {
        if (req.wantsJSON || !inputs.invalidRedirect) {
          return res.badRequest('Invalid username/password combination.');
        }
        return res.redirect(inputs.invalidRedirect);
      }

      req.session.me = person;

      if (req.wantsJSON || !inputs.successRedirect) {
        return res.ok();
      }
      return res.redirect(inputs.successRedirect);
    });
  }

  // Look up the user
  return person.attemptLoginEmail({
    email: inputs.email,
    password: inputs.password,
    name: inputs.name
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
