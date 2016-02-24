/**
 * EmailService
 */

module.exports = {

  sendSummary: function (req, res) {

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
        subject: 'Your BetterMeetings Summary',
        html: content,
      },
      function (err) {
        console.log(err || 'Summary is sent');
      }
    )

    return res.send('Email Test');
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

  computeEmailContent: function (topics) {
    var htmlString = '';
    for (var agendaitem in topics.todos) {
      htmlString += MarkdownService.parseMarkdown(agendaitem.title) + '\n';
      htmlString += MarkdownService.parseMarkdown(agendaitem.description) + '\n';
      htmlString += MarkdownService.parseMarkdown(agendaitem.done) + '\n';
      for (var todoitem in agendaitem.todos) {
        htmlString += MarkdownService.parseMarkdown(todoitem.title) + '\n';
        htmlString += MarkdownService.parseMarkdown(todoitem.description) + '\n';
        htmlString += MarkdownService.parseMarkdown(todoitem.assignee) + '\n';
        htmlString += MarkdownService.parseMarkdown(todoitem.done) + '\n';
      }
    }

    return htmlString;
  },

};

