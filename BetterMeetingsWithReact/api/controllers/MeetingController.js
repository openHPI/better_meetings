/**
 * MeetingController
 *
 * @description :: Server-side logic for managing Meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req,res) {
    if (req.method == "POST" && req.param( "Meeting" , null ) != null ) {
      Meeting.create( req.param("Meeting") ).done( function( err , model ) {
        if ( err ) {
          res.send("Error");
        } else {
          res.send("Success");
        }
      });
    } else {
      res.render('meeting/view');
    }
  },

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

  view: function(req,res) {
    var todoID = req.param("meetingID", null);

    Meeting.findOne(todoID).done(function(err,model) {
      res.render('meeting/view', {'model':model});
    });
  },

  delete: function(req,res) {
    var todoID = req.param("MeetingID", null);

    Meeting.findOne(todoID).done(function(err,user) {
      user.destroy(function(err) {
        res.send("Success");
      });
    });
  },

  generateurl: function () {
    var s = "";
      while(s.length<8&&8>0){
        var r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
      }
    return res.json({
      url: s,
    })
  },

  showMeetingDetails: function (req, res) {}
    
};

