/**
 * EmailService
 */

module.exports = {

  computeEmailContent: function (meetingSeriesTopics) {
    sails.log("whole meetingTopics are:");
    sails.log(meetingSeriesTopics);

    var htmlString = '';

    sails.log("test agendaitem: " + meetingSeriesTopics[0].title);
    sails.log("test todoitem: " + meetingSeriesTopics[0].todos[0].title);
    for (var _agendaitem in meetingSeriesTopics) {
      htmlString = htmlString.concat("#", meetingSeriesTopics[_agendaitem].title, "\n");
      htmlString = htmlString.concat("##", meetingSeriesTopics[_agendaitem].description, "\n");
      htmlString = htmlString.concat("##", meetingSeriesTopics[_agendaitem].done, "\n");
      var currAgendaItem = meetingSeriesTopics[_agendaitem];
      for (var _todoitem in currAgendaItem.todos) {
        htmlString = htmlString.concat("###", currAgendaItem.todos[_todoitem].title, "\n");
        htmlString = htmlString.concat("####", currAgendaItem.todos[_todoitem].description, "\n");
        htmlString = htmlString.concat("####", currAgendaItem.todos[_todoitem].assignee, "\n");
        htmlString = htmlString.concat("####", currAgendaItem.todos[_todoitem].done, "\n");
      }
    }
    sails.log("length of markdown string before parsing is: " + htmlString.length);
    sails.log("html string before parsing: " + htmlString);
    htmlString = MarkdownService.parseMarkdown(htmlString);
    return htmlString;
  },


  sendSummary: function (req, res) {

    // sails.hooks.email.send(template, data, options, cb)
    sails.hooks.email.send(
      'testEmail',
      //req.content,
      {
        recipientName: req.recipientName,
        senderName: 'BetterMeetings',
        senderEmail: 'postmaster@youremail.mailgun.org'
      },
      {
        from: 'BetterMeetings <postmaster@youremail.mailgun.org>',
        to: req.to,
        subject: 'Your BetterMeetings Summary',
        html: req.content,
      },
      function (err) {
        console.log(err || 'Summary is sent');
      }
    )

    //return res.send('Email Test');
  },

  sendInvitation: function () {

    var content = computeEmailContent(req.topics);

    // sails.hooks.email.send(template, data, options, cb)
    sails.hooks.email.send(
      'testEmail',
      {
        recipientName: req.recipientName,
        senderName: 'BetterMeetings',
        senderEmail: 'postmaster@youremail.mailgun.org'
      },
      {
        from: 'BetterMeetings <postmaster@youremail.mailgun.org>',
        to: req.to,
        subject: 'You have been invited to join a BetterMeeting',
        text: req.meetingLink,
      },
      function (err) {
        console.log(err || 'Invitation is sent');
      }
    )

    return res.send('Email Test');
  },

};

