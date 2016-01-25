/**
 * MeetingAdminController
 *
 * @description :: Server-side logic for managing Meetingadmins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	create: function(req, res) {

		var displayname = req.param('displayname');
      	var password = req.param('password');
      	var email = req.param('email');

		if (displayname && password && email) {
			meetingadmin.create({
				displayname:    displayname,
          		password:       password,
          		email:          email,
			}).exec(function createDB(err, created){
				if (err) {
					console.log('Admin not created: ', err);
				} else {
					console.log('Created Admin: ' + created.displayname)
					meetingadmin.publishCreate({
						id: 			created.id,
						displayname: 	created.displayname,
               			password: 		created.password,
               			email: 			created.email
					});
				}	
			})
		} else if (req.isSocket) {
			meetingadmin.watch(req);
			console.log('Admin with Socket ID ' + sails.sockets.id(req) + ' is now subscribed ');
		} else {
			//res.send('admin')
			sails.log('Admin was not created: too few parameters')
		}
	},
	
	delete: function(req,res) {
		var adminID = req.param("adminID", null);

		MeetingAdmin.findOne(adminID).done(function(err, admin) {
			admin.destroy(function(err) {
				res.send("Success")
			});
		});
	},

	update: function (req,res) {

	},

	view: function(req, res) {
		MeetingAdmin.findOne(id).exec(function displayList(err, items) {
               console.log(items);
               res.response = items;
               res.render('admin', {'model': 'MeetingAdmin'});

          })
	},

	viewAll: function(req,res) {
		MeetingAdmin.find().exec(function displayList(err, items) {
        	if (err) return res.serverError(err);

        	console.log(items);
        	return res.view('admin', {
        		admins: items,}
        	);
		});
	},

	displayAll: function (req,res) {
		MeetingAdmin.find(function storedMeetingAdmins(err, admins) {
			MeetingAdmin.subscribe(req.socket);
			MeetingAdmin.subscribe(req.socket, admins);
		});
	},

	setAssignee: function (req, res) {
		return res.json({
	    	todo: 'setAssignee() is not implemented yet!'
	    });
	},

	isDone: function (req, res) {
	    return res.json({
	    	todo: 'isDone() is not implemented yet!'
	    });
	},

	setDone: function (req, res) {
	    return res.json({
			todo: 'setDone() is not implemented yet!'
	    });
	},


    createMeeting: function (req, res) {
      	return res.json({
        	todo: 'createMeeting() is not implemented yet!'
      	});
    },

    deleteMeeting: function (req, res) {
      	return res.json({
       		todo: 'deleteMeeting() is not implemented yet!'
      	});
    },

    createMeeting: function (req, res) {
      	return res.json({
        	todo: 'createMeeting() is not implemented yet!'
      	});
    },

    deleteMeeting: function (req, res) {
      	return res.json({
        	todo: 'deleteMeeting() is not implemented yet!'
      	});
    },

    startMeeting: function (req, res) {
      	return res.json({
        	todo: 'startMeeting() is not implemented yet!'
      	});
    },

    endMeeting: function (req, res) {
      	return res.json({
        	todo: 'endMeeting() is not implemented yet!'
      	});
    },

    finishToDoItem: function (req, res) {
      	return res.json({
        	todo: 'finishToDoItem() is not implemented yet!'
      	});
    },

};

