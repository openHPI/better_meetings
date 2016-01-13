/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function (req, res) {
		Meeting.create(req.body).done(function(err, meeting) {
			res.end(JSON.stringify(meeting));
		})
	},

  /**
   * `MeetingController.createJourFixe()`
   */
  createJourFixe: function (req, res) {
    return res.json({
      todo: 'createJourFixe() is not implemented yet!'
    });
  }
};

