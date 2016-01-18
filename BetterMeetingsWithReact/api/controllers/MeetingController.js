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
  },

  generateurl: function (req, res) {
    var s = "";
      while(s.length<8&&8>0){
        var r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
      }
    return res.json({
      url: s,
    })
  },

  showMeetingDetails: function (req, res) {}
    
};

