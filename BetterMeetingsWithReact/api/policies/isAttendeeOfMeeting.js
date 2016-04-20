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
  var attendees;
  var i;

  function findPerId(meetingId) {
    return meeting.findOne(meetingId);
  }

  function findPerUrl() {
    var url;
    var path;
    var segments;

    if (req.wantsJSON) {
      if (typeof req.socket == 'undefined') {
        return false;
      }

      path = req.socket.request.headers.referer;
      segments = path.split('/');

      if (segments[segments.length - 2] === 'id' && segments[segments.length -
        3] === 'meeting') {
        url = path.split('/').pop();
      }
    } else {
      url = req.param('url');
    }

    return meeting.findOne({ url: url });
  }

  function findMeeting(err, cre) {

    if (err) {
      sails.log.error('ERR:', err);

      if (req.wantsJSON) {
        return res.send(403);
      }

      // Otherwise if this is an HTML-wanting browser, do a redirect.
      return res.forbidden('Access denied.');
    }

    if (cre) {
      attendees = cre.attendees;

      for (i = 0; i < attendees.length; i++) {
        if (attendees[i].email === email) {
          return next();
        }
      }
    }

    if (req.wantsJSON) {
      return res.send(403);
    }

    return res.forbidden('Access denied.');
  }

  if (req.session.me && req.session.me.isAdmin === true) {
    id = req.param('id');
    email = req.session.me.email;

    if (id) {
      return findPerId(id).populate('attendees').exec(findMeeting);
    }
    return findPerUrl().populate('attendees').exec(findMeeting);
  }

  if (req.wantsJSON) {
    return res.send(403);
  }

  return res.view('login/login', { redirect: req.url });
};
