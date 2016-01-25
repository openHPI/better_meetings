/**
 * MeetingSeriesController
 *
 * @description :: Server-side logic for managing Meetingsseries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*=================================================================================
=            create meetingseries instance and associated model 
=            instances and doing a pubsub for realtime (Radscheit)              =
=================================================================================*/
  
	create: function(req,res) {

    var members = req.param('meetingseries');
    var topics = req.param('topics');
    var meeting = req.param('meeting');
    var url = generateurl();
    var timer = req.param('timer');

    if (members && topics && meeting && url && timer) {

      MeetingSeries.create({
        members: members,
        topics: topics,
        meeting: meeting,
        url: url,
        timer: timer,
      }).exec( function createMeeting(err,cre) {
        if (err) console.log('[bm-error] meeting not created: ' + err);

        MeetingSeries.publishCreate({
          id:       cre.id,
          topics:   cre.topics,
          meeting: cre.meeting,
          url:      cre.url,
          timer:    cre.timer,
        });

        return res.json({
          notice: '[bm-success] meeting ' + cre.title + 'created',
        });
      });
    } else if ( req.isSocket ) {

      MeetingSeries.watch(req);
      console.log('[bm-success] client with socket ' + sails.socket.id(req) + 'is istening to meeting.')
    }; 
  },



/*==================================================================
=            update meetingseries model instances (Radscheit)            =
===================================================================*/

  update: function(req,res) {
    var todoID = req.param("meetingID", null);

    MeetingSeries.findOne(todoID).done(function(err,model) {
      if (req.method == "POST" && req.param("MeetingSeries",null) != null) {
        var item = req.param("MeetingSeries",null);
        model.members = item.members;
        model.topics = item.topics;
        model.meeting = item.meeting;
        model.timer = item.timer;

        model.save(function(err) {
          if (err) {
            res.send("Error");
          } else {
            res.send("Success");
          }
        });
      } else {
        res.render('meetingseries/view',{'model':model});
      }
    })
  },

/*===================================================================
=            feed a view for meetingseries instances and the 
             other associated model instances (Radscheit)            =
===================================================================*/

  view: function(req,res) {

  },

/*===========================================================================
=            destroy instances of meetingseries model and clear the 
             other model tables from its belongings. (Radscheit)             =
===========================================================================*/




  delete: function(req,res) {

  },

  insertExampleData: function(req,res) {
    Exampledataservice.generateExampleMeetings();
  },

    
};

