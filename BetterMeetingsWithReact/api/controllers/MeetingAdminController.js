/**
 * MeetingAdminController
 *
 * @description :: Server-side logic for managing Meetingadmins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  create: function (req,res) {
    sails.log('Creation started');
    var displayname = req.param('displayname');
    var password = req.param('password');
    var email = req.param('email');

    if (displayname && password && email) {
      MeetingAdmin.create({
        displayname:    displayname,
        password:       password,
        email:          email,
      }).exec( function createMeetingAdmin(err,cre) {
        if (err) {
          sails.log('[bm-error] meetingadmin not created' + err);
        } else {
          sails.log('[success] meetingadmin created: ' + cre.displayname);
          // return res.view('meetingadmins', {
          //   users: cre,
          // });
        }
      })
    }
  },

  viewAll: function(req,res) {

    MeetingAdmin.find().exec(function displayMeetingAdminList(err,items) {
      if (err) return res.serverError(err);

      sails.log('Admins:' + items);

      return res.view('meetingadmins', {
        users: items,
      });
    });

  },
  /**
   * `MeetingAdminController.createMeeting()`
   */
  createMeeting: function (req, res) {
    return res.json({
      todo: 'createMeeting() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.deleteMeeting()`
   */
  deleteMeeting: function (req, res) {
    return res.json({
      todo: 'deleteMeeting() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.createJourFixe()`
   */
  createJourFixe: function (req, res) {
    return res.json({
      todo: 'createJourFixe() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.deleteJourFixe()`
   */
  deleteJourFixe: function (req, res) {
    return res.json({
      todo: 'deleteJourFixe() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.startJourFixe()`
   */
  startJourFixe: function (req, res) {
    return res.json({
      todo: 'startJourFixe() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.endJourFixe()`
   */
  endJourFixe: function (req, res) {
    return res.json({
      todo: 'endJourFixe() is not implemented yet!'
    });
  },


  /**
   * `MeetingAdminController.finishToDoItem()`
   */
  finishToDoItem: function (req, res) {
    return res.json({
      todo: 'finishToDoItem() is not implemented yet!'
    });
  },

  exampledata: function(req,res) {
    sails.log('generation started');
      var admin1 = {
          'email': 'test1@hpi.de',
          'password': 'password',
          'displayName': 'TestAdmin 1',
          };
      var admin2 = {
          'email': 'test2@hpi.de',
          'password': 'password',
          'displayName': 'TestAdmin 2',
          };
      var admin3 = {
          'email': 'test3@hpi.de',
          'password': 'password',
          'displayName': 'TestAdmin 3',
          };
      var meetingAdmins = {
        'param': [admin1,admin2,admin3],
      }

      sails.log(meetingAdmins);
        

      for (var i = 0; i < meetingAdmins.length; i++) {
        sails.log('Runde: ' + i);
        MeetingAdminController.create(meetingAdmins[i], function(err,cre) {
          if (err) {
            sails.log('Fehler');
          } else {
            sails.log('erfolg');
          }
        });

      };
    return res.send('Toll');
  },
};

