/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: control the admin - meetingseries space
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {
  var id;
  var email;
  var admins;
  var i;

  if (req.session.me && req.session.me.isAdmin === true) {
    id = req.param('id');
    email = req.session.me.email;

    return meeting.findOne(id).populate('admins').exec(function findMeeting(err, cre) {
      if (err) {
        sails.log.error('ERR:', err);

        if (req.wantsJSON) {
          return res.send(403);
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.forbidden('Access denied.');
      }

      if (cre) {
        admins = cre.admins;

        for (i = 0; i < admins.length; i++) {
          if (admins[i].email === email) {
            return next();
          }
        }
      }

      if (req.wantsJSON) {
        return res.send(403);
      }

      return res.forbidden('Access denied.');
    });
  }

  if (req.wantsJSON) {
    return res.send(403);
  }

  return res.view('login/login', { redirect: req.url });
};
