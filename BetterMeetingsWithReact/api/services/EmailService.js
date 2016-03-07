/**
 * EmailService
 * using Markdown Syntax from: http://daringfireball.net/projects/markdown/syntax
 */

module.exports = {

  computeInviteEmailContent: function (_inviteLink, _title) {
    var htmlString = '';
    htmlString = htmlString.concat("Hi there,", "\n", "We are just letting you know that you have been invited to the Meeting ", _title, "\n");
    htmlString = htmlString.concat("To participate, press [here](",_inviteLink ,")\n");
    htmlString = htmlString.concat("Cheers,\nYour BetterMeetings Team");

    htmlString = MarkdownService.parseMarkdown(htmlString);
    return htmlString;
  },


  computeSummaryEmailContent: function (_meeting, _globalUrl) {
    sails.log("whole meetingTopics are:");
    sails.log(_meeting.topics);

    var htmlString = '';

    htmlString = htmlString.concat("![HPI Logo] (/assets/images/HPI.jpg)", "\n");
    htmlString = htmlString.concat("#", "**", _meeting.title, "**", "\n");
    if  (_meeting.description != null && _meeting.description != "") {
      htmlString = htmlString.concat("\t", _meeting.description, "\n");
    }
    for (var _agendaitem in _meeting.topics) {
      htmlString = htmlString.concat("###", "**", _agendaitem + 1, ". ",_meeting.topics[_agendaitem].title, "**", "\n");
      htmlString = htmlString.concat("\t", _meeting.topics[_agendaitem].description, "\n");
      htmlString = htmlString.concat("done: ", _meeting.topics[_agendaitem].done, "\n");

      var currAgendaItem = _meeting.topics[_agendaitem];
      for (var _todoitem in currAgendaItem.todos) {
        htmlString = htmlString.concat("###", "*",currAgendaItem.todos[_todoitem].title, "*", "\n");
        htmlString = htmlString.concat("\t" , currAgendaItem.todos[_todoitem].description, "\n");
        htmlString = htmlString.concat("\n", "+ assigned to: ", currAgendaItem.todos[_todoitem].assignee, "\n");
        htmlString = htmlString.concat("+ done: ", currAgendaItem.todos[_todoitem].done, "\n");
        htmlString = htmlString.concat("+ important: ", currAgendaItem.todos[_todoitem].important, "\n");
      }
    }
    if (_globalUrl != null && _globalUrl != "")  {
      htmlString = htmlString.concat("\n", "[Global valid link for all meetings of this meeting group](",_globalUrl ,")");
    }
    //htmlString = htmlString.concat("[Unsubscribe from further summary emails of this meeting group](",_unsubUrl ,")");

    //sails.log("length of markdown string before parsing is: " + htmlString.length);
    //sails.log("html string before parsing: " + htmlString);
    htmlString = MarkdownService.parseMarkdown(htmlString);
    return htmlString;
  },


  sendSummary: function (req, res) {
    var _subject = '';
    _subject = _subject.concat("Your Summary from ", req.title);
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
        subject: _subject,
        html: req.content,
      },
      function (err) {
        console.log(err || 'Summary is sent');
      }
    )

    //return res.send('Email Test');
  },

  sendInvitation: function () {

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
        html: req.content,
      },
      function (err) {
        console.log(err || 'Invitation is sent');
      }
    )

    //return res.send('Email Test');
  },

};

