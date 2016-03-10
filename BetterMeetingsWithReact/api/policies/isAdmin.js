/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: control the admin space
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {
  if (req.session.me) {
    if (req.session.me.isAdmin === true) return next();
  }

  if (req.wantsJSON) {
    return res.send(403);
  }

  return res.forbidden('Access denied.');
};
