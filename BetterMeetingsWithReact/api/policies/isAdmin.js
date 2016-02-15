/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: controll the admin space
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  if (req.session.me) {
    if (req.session.me.isAdmin == true) return next();

    return res.redirect('/forbidden');
  } else {
    if (req.wantsJSON) {
      return res.send(401);
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/forbidden');
  }
};
