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
    //htmlString = htmlString.concat("![HPI Logo] (/assets/images/HPI.jpg)", "\n");

    htmlString = this.buildMeetingString(htmlString, _meeting);

    if (_globalUrl != null && _globalUrl != "")
      htmlString = htmlString.concat("\n", "[Global valid link for all meetings of this meeting group](",_globalUrl ,")");


    //htmlString = htmlString.concat("[Unsubscribe from further summary emails of this meeting group](",_unsubUrl ,")");

    //sails.log("length of markdown string before parsing is: " + htmlString.length);
    //sails.log("html string before parsing: " + htmlString);

    htmlString = MarkdownService.parseMarkdown(htmlString);
    return htmlString;
  },


  buildMeetingString: function (_string, _meeting) {
    if (_meeting.title != null && _meeting.title != "")
      _string = _string.concat("#", "**", _meeting.title, "**", "\n");

    if  (_meeting.description != null && _meeting.description != "")
      _string = _string.concat("\t", _meeting.description, "\n");

    _string = this.buildAgendaItemString(_string, _meeting.topics);

    return _string
  },


  buildAgendaItemString: function (_string, _agendaitems) {

    for (var _agendaitem = 0; _agendaitem < _agendaitems.length; _agendaitem++) {
      if (_agendaitems[_agendaitem].title != null && _agendaitems[_agendaitem].title != "")
        _string = _string.concat("\n", "###", "**", (_agendaitem) + 1, ". ",_agendaitems[_agendaitem].title, "**", "\n");

      if (_agendaitems[_agendaitem].description != null && _agendaitems[_agendaitem].description != "")
        _string = _string.concat("\t", _agendaitems[_agendaitem].description, "\n");

      if (_agendaitems[_agendaitem].done != null) {
        if (_agendaitems[_agendaitem].done === true)
          _string = _string.concat("\n", "done: ", "yes", "\n");
        else
          _string = _string.concat("\n", "done: ", "no", "\n");
      }

      if (_agendaitems[_agendaitem].todos != null)
        _string = this.buildTodoItemString(_string, _agendaitems[_agendaitem].todos);
    }
    return _string
  },


  buildTodoItemString: function (_string, _todoitems) {
    for (var _todoitem in _todoitems) {
      if (_todoitems[_todoitem].title != null && _todoitems[_todoitem].title != "")
        _string = _string.concat("\n", "###", "*",_todoitems[_todoitem].title, "*", "\n");

      if (_todoitems[_todoitem].description != null && _todoitems[_todoitem].description != "")
        _string = _string.concat("\t" , _todoitems[_todoitem].description, "\n");

      if (_todoitems[_todoitem].assignee != null && _todoitems[_todoitem].assignee != "")
        _string = _string.concat("\n", "+ assigned to: ", _todoitems[_todoitem].assignee, "\n");

      if (_todoitems[_todoitem].done != null) {
        if (_todoitems[_todoitem].done === true)
          _string = _string.concat("\n", "+ done: ", "yes", "\n");
        else
          _string = _string.concat("\n", "+ done: ", "no", "\n");
      }
      if (_todoitems[_todoitem].important != null) {
        if (_todoitems[_todoitem].important === true)
          _string = _string.concat("\n", "+ important: ", "yes", "\n");
        else
          _string = _string.concat("\n", "+ important: ", "no", "\n");
      }
    }

    return _string
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

