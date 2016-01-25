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
    var todoItemID = req.param('todoItemID');
    var title = req.param('title');
    var done = req.param('done');

    if (todoItemID && title && done) {
      todoitem.create({
        todoItemID:   todoItemID,
        title:        title,
        done:         done,
      }).exec( function createToDoItem(err,created) {
        if (err) {
          console.log('ToDoItem not created' + err);
        } else {
          console.log('Created ToDoItem: ' + created.title);
          todoitem.publishCreate({
            id: created.id,
            todoItemID: created.todoItemID,
            title: created.title,
            done: created.done,
           });

        }
      })
    } else if (req.isSocket){
           todoitem.watch(req);
           sails.log('ToDoItem with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'todoitem\'.');
    } else {
        res.send('todoitem');
        console.log('ToDoItem not created: too few parameters');
    }
  },

  update: function(req,res) {
    sails.log('Update started');
    sails.log(req.param('title'));
    var todoItemID = req.param('todoItemID');
    var title = req.param('title');
    var done = req.param('done');
    var description = req.param('description');
    var owner = req.param('owner');
    var author = req.param('author');
    var assignee = req.param('assignee');


    if (todoItemID && title && done && description && owner && author && assignee && req.isSocket) {
      todoitem.update({
        todoItemID:   todoItemID,
        title:        title,
        done:         done,
        description:  description,
        owner:        owner,
        author:       author,
        assignee:     assignee,
      }).exec(function updateToDoItem(err, updated) {
        if (err) {
          console.log('ToDoItem not updated ' + err);
          //res.redirect('/todoitem/edit');
        } else if (!updated) {
          console.log('Update error for ToDoItem ' + err);
          //res.redirect('/todoitem/edit');
        } else {
          console.log('Updated ToDoItem: ' + updated.title);
          todoitem.publishUpdate({
            id:           updated.id,
            todoItemID:   updated.todoItemID,
            title:        updated.title,
            done:         updated.done,
            description:  updated.description,
            owner:        updated.owner,
            author:       updated.author,
            assignee:     updated.assignee,
          });
        }
      });
    } else {
        res.send('todoitem');
        //res.redirect('/todoitem/view/'+id);
        console.log('ToDoItem not updated: too few parameters');
      }
  },

  subscribe: function(req,res) {
   if (req.isSocket) {
      todoitem.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'todoitem\'.');
   }
  },

  view: function(req,res) {
    var todoID = req.param("todoItemID", null);

    ToDoItem.findOne(todoID).done(function(err,model) {
      res.render('meeting/view', {'model':model});
    });
  },

  delete: function(req,res) {
    var todoID = req.param("todoItemID", null);

    ToDoItem.findOne(todoID).done(function(err,user) {
      user.destroy(function(err) {
        res.send("Success");
      });
    });
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

