/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: control the admin - meetingseries space
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {
  var meetingSeriesId;
  var email;
  var admins;
  var i;

  if (req.session.me && req.session.me.isAdmin === true) {
    meetingSeriesId = req.param('id');
    email = req.session.me.email;

    return meetingseries.findOne(meetingSeriesId).populate('admins').exec(function findMeetingSerien(err, cre) {
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
            console.log('go next');
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

  return res.forbidden('Access denied.');
};
