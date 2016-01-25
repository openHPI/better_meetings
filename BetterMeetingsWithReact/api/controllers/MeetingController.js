/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {

	},
	
	delete: function(req,res) {
		var meetingID = req.param("meetingID", null);

		Meeting.findOne(meetingID).done(function(err, meeting) {
		  meeting.destroy(function(err) {
		    res.send("Success");
		  });
		});
	},

	update: function (req,res) {

		sails.log('Update started');
		var topics = req.param('topics');
		var attendees = req.param('attendees');

		if (topics && attendees && req.isSocket) {
		  meeting.update({
		    topics:      topics,
		    attendees:   attendees,
		  }).exec(function updateMeeting(err, updated) {
		    if (err) {
		      console.log('Meeting not updated ' + err);
		      //res.redirect('/meeting/edit');
		    } else if (!updated) {
		      console.log('Update error for Meeting ' + err);
		      //res.redirect('/meeting/edit');
		    } else {
		      console.log('Updated Meeting: ' + updated.topics);
		      meeting.publishUpdate({
		        id: updated.id,
		        topics: updated.topics,
		        attendees: updated.attendees,
		      });
		    }
		  });
		} else {
		    res.send('meeting');
		    //res.redirect('/meeting/view/'+id);
		    console.log('Meeting not updated: too few parameters');
		  }
	},

	view: function(req, res) {
		Meeting.watch(req);
		Meeting.findOne(id).exec(function displayList(err, items) {
		  console.log(items);
		  res.response = items;
		  res.render('meeting', {'model': 'meeting'});

		});
	},

	// viewAll: function(req,res) {
		// Meeting.find().exec(function displayMeetingList(err, items) {
		//   if (err) return res.serverError(err);
		//   sails.log('meeting:' + items);
		//   Meeting.subscribe(req.socket);
		//   Meeting.subscribe(req.socket, items);
		//   return res.view('meeting', {
		//     users: items,
		//   });
		// });
	// },

	getAttendees: function(req, res) {

	},

	shareLink: function(req, res) {

	},

	start: function(req, res) {

	},

	end: function(req, res) {

	},

};

