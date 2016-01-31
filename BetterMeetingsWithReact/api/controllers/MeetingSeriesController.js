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
    
    var admins = req.param('admins');
    var title = req.param('title'); 
    var meeting = req.param('meeting'); 
    var url = req.param('url'); 
    var timer = req.param('timer'); 

    if (admins && title && meeting && url && timer) {

      MeetingSeries.create({
        admins: admins,
        title: title,
        meeting: meeting,
        url: url,
        timer: timer,
      }).exec( function createMeetingSeries(err, created) {
        if (err) {
          console.log('[bm-error] meetingseries not created: ' + err);
        } else {
            console.log('Created MeetingSeries: ' + created.title);
            meetingseries.publishCreate({
              id: created.id,
              admins: created.admins,
              title: created.title,
              meeting: created.meeting,
              url: created.url,
              timer: created.timer,
             });
          }
        });
      } else if (req.isSocket){
             sails.log('MeetingSeries with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meetingseries\'.');
      } else {
          res.send('meetingseries');
          console.log('MeetingSeries not created: too few parameters');
      }
  },



/*==================================================================
=            update meetingseries model instances (Radscheit)            =
===================================================================*/

  update: function(req,res) {
    sails.log('Update started');
    sails.log(req.param('title'));
    var admins = req.param('admins');
    var title = req.param('title'); 
    var meeting = req.param('meeting'); 
    var url = req.param('url'); 
    var timer = req.param('timer');
    var members = req.param('members');
    var description = req.param('description');
    var topics = req.param('topics');

    if (admins && title && meeting && url && timer && members && description && topics && req.isSocket) {
      meetingseries.update({
        admins: admins,
        title: title,
        meeting: meeting,
        url: url,
        timer: timer,
        members: members,
        description: description,
        topics: topics,

      }).exec(function updateMeetingSeries(err, updated) {
        if (err) {
          console.log('MeetingSeries not updated ' + err);
          //res.redirect('/meetingseries/edit');
        } else if (!updated) {
          console.log('Update error for MeetingSeries ' + err);
          //res.redirect('/meetingseries/edit');
        } else {
          console.log('Updated MeetingSeries: ' + updated.title);
          meetingseries.publishUpdate({
            id: updated.id,
            admins: updated.admins,
            title: updated.title,
            meeting: updated.meeting,
            url: updated.url,
            timer: updated.timer,
            members: updated.members,
            description: updated.description,
            topics: updated.topics,
          });
        }
      });
    } else {
        res.send('meetingseries');
        //res.redirect('/meetingseries/view/'+id);
        console.log('MeetingSeries not updated: too few parameters');
      }
  },

/*===================================================================
=            feed a view for meetingseries instances and the 
             other associated model instances (Radscheit)            =
===================================================================*/

  view: function(req,res) {
    //meetingSeries.watch(req);
    var id = req.param('id', null);
    MeetingSeries.findOne(id).exec(function displayList(err, items) {
        console.log(items);
        res.response = items;
        res.render('meetingseries', {'model': 'meetingseries'});

      });
  },

/*===========================================================================
=            destroy instances of meetingseries model and clear the 
             other model tables from its belongings. (Radscheit)             =
===========================================================================*/

  delete: function(req,res) {
    var meetingSeriesID = req.param("meetingSeriesID", null);
    if (meetingSeriesID && req.isSocket) {
      MeetingSeries.findOne(meetingSeriesID).exec(function findMeetingSeries(err, meetingSeriesAnswer) {
        meetingseries.destroy({id: meetingSeriesAnswer.id}).exec(function destroy(err) {
          if (err) {
            sails.log('Error while deleting meetingseries');
            res.send("Error");
          } else {
            sails.log("Successfully deleted " + meetingseriesID);
            meetingseries.publishDestroy({id: meetingSeriesAnswer.id});   
          }
        });
      });
    }
  },

  // viewAll: function(req,res) {
  //     meetingseries.find().exec(function displayMeetingSeriesList(err, items) {
  //       if (err) return res.serverError(err);
  //       sails.log('meetingseries:' + items);
  //       MeetingSeries.subscribe(req.socket);
  //       MeetingSeries.subscribe(req.socket, items);
  //       return res.view('meetingseries', {
  //         users: items,
  //       });
  //     });
  //   },

  subscribe: function(req,res) {
    if (req.isSocket) {
      meetingseries.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'meetingseries\'.');
    }  
  },

  insertExampleData: function(req,res) {
    Exampledataservice.generateExampleMeetings();
  },

    
};

