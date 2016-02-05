/**
 * ToDoItemController
 *
 * @description :: Server-side logic for managing Todoitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  create: function(req,res) {
    sails.log('Creation started');
    sails.log(req.param('title'));
    var title = req.param('title');
    var description = req.param('description');
    var owner = req.param('owner');
    var author = req.param('author');
    var assignee = req.param('assignee');
    var done = req.param('done');

    if (title && owner && author) {
      todoitem.create({
        title:        title,
        description:  description,
        owner:        owner,
        author:       author,
        assignee:     assignee,
        done:         done
      }).exec( function createToDoItem(err,created) {
        if (err) {
          console.log('ToDoItem not created' + err);
        } else {
          console.log('Created ToDoItem: ' + created.title);
          todoitem.publishCreate({
            id: created.id,
            title: created.title,
            description: created.description,
            owner: created.owner,
            author: created.author,
            assignee: assignee,
            done: created.done
           });
        }
      })
    } else {
        res.send('todoitem');
        console.log('ToDoItem not created: too few parameters');
    }
  },

  update: function(req,res) {
    sails.log('Update started');
    sails.log(req.param('title') + " ID: " + req.param('id'));
    var id = req.param('id');
    var title = req.param('title');
    var done = req.param('done');
    var description = req.param('description');
    var owner = req.param('owner');
    var author = req.param('author');
    var assignee = req.param('assignee');
    sails.log("after param assigmnment");


    if (id && title && description && req.isSocket) {
      sails.log("number of params ok");
      todoitem.update({'id': id},{
        title:                   title,
        done:                done,
        description:       description,
        owner:               owner,
        author:               author,
        assignee:           assignee,
      }).exec(function updateToDoItem(err, updated) {

           sails.log("exec ok");

           if (err) {

             sails.log('ToDoItem not updated ' + err);

           } else if (!updated) {

             sails.log('Update error for ToDoItem ' + err);

           } else {

             sails.log('Updated ToDoItem: ' + updated[0].title);

             console.dir(updated);

             todoitem.publishUpdate( updated[0].id,
             {
               title:        updated[0].title,
               done:         updated[0].done,
               description:  updated[0].description,
               owner:        updated[0].owner,
               author:       updated[0].author,
               assignee:     updated[0].assignee,
             });
         };
      });
    } else {
        sails.log('ToDoItem not updated: too few parameters');
        res.send('todoitem');
        //res.redirect('/todoitem/view/'+id);
      }
  },

  subscribe: function(req,res) {
   if (req.isSocket) {
      todoitem.watch(req);
      sails.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'todoitem\'.');
   }
  },

  view: function(req,res) {
    var todoID = req.param("todoItemID", null);

    ToDoItem.findOne(todoID).done(function(err,model) {
      res.render('meeting/view', {'model':model});
    });
  },

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
  //   todoitem.find().exec(function displayToDoItemList(err, items) {
  //     if (err) return res.serverError(err);
  //     sails.log('todoitem:' + items);
  //     ToDoItem.subscribe(req.socket);
  //     ToDoItem.subscribe(req.socket, items);
  //     return res.view('todoitem', {
  //       users: items,
  //     });
  //   });
  // },

  // displayAll: function (req,res) {
  // }
};

