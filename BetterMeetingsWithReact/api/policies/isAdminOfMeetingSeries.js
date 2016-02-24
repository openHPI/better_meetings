/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: control the admin - meetingseries space
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  if (req.session.me && req.session.me.isAdmin == true) {
    var meeting_id = req.param('id');
    var email = req.session.me.email;

    meetingseries.findOne(meeting_id).populate('admins').exec(function findMeetingSerien(err, cre) {
      if (err) {
        sails.log.error('ERR:', err);

        if (req.wantsJSON) {
          return res.send(403);
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.forbidden('Access denied.');
      }

      if (cre) {
        var admins = cre.admins;

        for (var i = 0; i < admins.length; i++) {
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
  } else {
    if (req.wantsJSON) {
      return res.send(403);
    }

    return res.forbidden('Access denied.');
  }
};
