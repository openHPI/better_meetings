/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*=================================================================================
=            create meeting instance and associated model 
=            instances and doing a pubsub for realtime (Radscheit)              =
=================================================================================*/
  
	create: function(req,res) {

    var members = req.param('meetinggroup');
    var topics = req.param('topics');
    var jourfixe = req.param('jourfixe');
    var url = generateurl();
    var timer = req.param('timer');

    if (members && topics && jourfixe && url && timer) {

      Meeting.create({
        members: members,
        topics: topics,
        jourFixe: jourfixe,
        url: url,
        timer: timer,
      }).exec( function createMeeting(err,cre) {
        if (err) console.log('[bm-error] meeting not created: ' + err);

        Meeting.publishCreate({
          id:       cre.id,
          topics:   cre.topics,
          jourfixe: cre.jourFixe,
          url:      cre.url,
          timer:    cre.timer,
        });

        return res.json({
          notice: '[bm-success] meeting ' + cre.title + 'created',
        });
      });
    } else if ( req.isSocket ) {

      Meeting.watch(req);
      console.log('[bm-success] client with socket ' + sails.socket.id(req) + 'is istening to meeting.')
    }; 
  },



/*==================================================================
=            update meeting model instances (Radscheit)            =
===================================================================*/

  update: function(req,res) {
    var todoID = req.param("meetingID", null);

    Meeting.findOne(todoID).done(function(err,model) {
      if (req.method == "POST" && req.param("Meeting",null) != null) {
        var item = req.param("Meeting",null);
        model.members = item.members;
        model.topics = item.topics;
        model.jourFixe = item.jourFixe;
        model.timer = item.timer;

        model.save(function(err) {
          if (err) {
            res.send("Error");
          } else {
            res.send("Success");
          }
        });
      } else {
        res.render('meeting/view',{'model':model});
      }
    })
  },

/*===================================================================
=            feed a view for meeting instances and the 
             other associated model instances (Radscheit)            =
===================================================================*/

  view: function(req,res) {

  },

/*===========================================================================
=            destroy instances of meeting model and clear the 
             other model tables from its belongings. (Radscheit)             =
===========================================================================*/




  delete: function(req,res) {

  },

  insertExampleData: function(req,res) {
    Exampledataservice.generateExampleMeetings();
  },

    
};

