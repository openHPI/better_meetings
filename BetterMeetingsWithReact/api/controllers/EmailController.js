/**
 * EmailController
 *
 * @description :: Server-side logic for managing Emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	sendEmail: function(req, res) {

			var content = computeEmailContent(req.topics);

			// sails.hooks.email.send(template, data, options, cb)
			sails.hooks.email.send(
			  "testEmail",
			  {
			    recipientName: req.recipientName,
			    senderName: "BetterMeetings",
			    senderEmail: PW.mail
			  },
			  {
			  	from: "BetterMeetings <"PW.mail">",
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

