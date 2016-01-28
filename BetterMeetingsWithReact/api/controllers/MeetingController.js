/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {

		var topics = req.param('topics');
		var attendees = req.param('attendees');
		var isInitialCreation = req.param('isInitialCreation');
		
		if (isInitialCreation === false) {
			
			if (displayname && password && email) {
			  meeting.create({
			    topics: 			topics,
			    attendees: 			attendees,
			    isInitialCreation: 	isInitialCreation,
			  }).exec( function createMeeting(err,created) {
			    if (err) {
			      console.log('Meeting not created' + err);
			    } else {
			      console.log('Created Meeting');
			      meeting.publishCreate({
			        id: 				created.id,
			        topics: 			created.topics,
			        attendees: 			created.attendees,
			        isInitialCreation: 	created.isInitialCreation,
			       });
			    }
			  });
			} 
		} else if (req.isSocket){
		       sails.log('Meeting with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meeting\'.');
		} else {
		    res.send('meeting');
		    console.log('Meeting not created: too few parameters');
		}
	},
	
	delete: function(req,res) {
		var meetingID = req.param("meetingID", null);

		Meeting.findOne(meetingID).done(function(err, meeting) {
		  meeting.destroy(function(err) {
		  	if (err) {
            sails.log('Error while deleting meeting');
            res.send("Error");
          }
		    res.send("Success");
		  });
		});
	},

	update: function (req,res) {

		sails.log('Update started');
		var topics = req.param('topics');
		var attendees = req.param('attendees');
		var isInitialCreation = req.param('isInitialCreation');

		if (topics && attendees && isInitialCreation && req.isSocket) {
		  meeting.update({
		    topics:      		topics,
		    attendees:   		attendees,
		    isInitialCreation: 	isInitialCreation,
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
		        isInitialCreation: updated.isInitialCreation,
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
		//meeting.watch(req);
		var id = req.param('id', null);
		Meeting.findOne(id).exec(function displayList(err, items) {
		  console.log(items);
		  res.response = items;
		  res.render('meeting', {'model': 'meeting'});

		});
	},

	// viewAll: function(req,res) {
	// 	Meeting.find().exec(function displayMeetingList(err, items) {
	// 	  if (err) return res.serverError(err);
	// 	  sails.log('meeting:' + items);
	// 	  Meeting.subscribe(req.socket);
	// 	  Meeting.subscribe(req.socket, items);
	// 	  return res.view('meeting', {
	// 	    users: items,
	// 	  });
	// 	});
	// },

	subscribe: function(req,res) {
	 	if (req.isSocket) {
	    	meeting.watch(req);
	    	console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meeting\'.');
	 	}
	},

	getAttendees: function(req, res) {

	},

	shareLink: function(req, res) {

	},

	start: function(req, res) {

	},

	end: function(req, res) {

	},

};

