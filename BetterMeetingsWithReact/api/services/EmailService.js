/**
 * EmailService
 */

module.exports = {

	sendSummary: function(req, res) {

			var content = computeEmailContent(req.topics);

			// sails.hooks.email.send(template, data, options, cb)
			sails.hooks.email.send(
			  "testEmail",
			  {
			    recipientName: req.recipientName,
			    senderName: "BetterMeetings",
			    senderEmail: "postmaster@youremail.mailgun.org"
			  },
			  {
			  	from: "BetterMeetings",
			    to: req.to,
			    subject: "Your BetterMeetings Summary",
			    //html: {path: '..'},
			  },
			  function(err) {console.log(err || "Email is sent");}
			)

			return res.send('Email Test');
	},

	computeEmailContent: function(topics) {

	},

};

