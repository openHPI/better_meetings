/**
 * ToDoItemController
 *
 * @description :: Server-side logic for managing Todoitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


  create: function (req, res) {
    sails.log('Creation started');
    sails.log(req.param('title'));
    var title = req.param('title');
    var description = req.param('description');
    var owner = req.param('owner');
    var author = req.param('author');
    var assignee = req.param('assignee');
    var done = req.param('done');
    var important = req.param('important');

    if (title && owner && author) {
      todoitem.create(
        {
          title: title,
          description: description,
          owner: owner,
          author: author,
          assignee: assignee,
          done: done,
          important: important
        })
        .exec(function createToDoItem(err, created) {
          if (err) {
            console.log('ToDoItem not created' + err);
          }
          else {
            console.log('Created ToDoItem: ' + created.title);
            todoitem.publishCreate(
              {
                id: created.id,
                title: created.title,
                description: created.description,
                owner: created.owner,
                author: created.author,
                assignee: assignee,
                done: created.done,
                important: created.important
              });
          }
        })
    }
    else {
      res.send('todoitem');
      console.log('ToDoItem not created: too few parameters');
    }
  },


  update: function (req, res) {
    sails.log('Update started');
    sails.log(req.param('title') + " ID: " + req.param('id'));
    var todoItemId = req.param('id');
    var title = req.param('title');
    var done = req.param('done');
    var description = req.param('description');
    var owner = req.param('owner');
    var author = req.param('author');
    var assignee = req.param('assignee');
    var important = req.param('important');
    sails.log("after param assigmnment");


    if (todoItemId && title && description && done !== null && req.isSocket) {
      sails.log("number of params ok");
      todoitem.update({id: todoItemId}).set({
          title:        title,
          done:         done,
          description:  description,
          owner:        owner,
          author:       author,
          assignee:     assignee,
          important:    important,
      })
      .exec(function updateToDoItem(err, updated) {
        sails.log("exec ok");

        if (err) {
          sails.log('ToDoItem not updated ' + err);
        } else {
          sails.log('Updated ToDoItem: ' + updated[0].title);

          updated[0].save(function (err) {
            if (err) {
              sails.log("Error while saving update to ToDoItem " + updated[0].title);
            } else {
              sails.log("Successfully saved updates to ToDoItem " + updated[0].title);

              todoitem.publishUpdate(updated[0].id, {
                id: updated[0].id,
                title: updated[0].title,
                done: updated[0].done,
                description: updated[0].description,
                owner: updated[0].owner,
                author: updated[0].author,
                assignee: updated[0].assignee,
                important: updated[0].important,
              });
            }
          });
        }});
    } else {
      res.send('todoitem');
      sails.log('ToDoItem not updated: to few parameters');
    }
  },


  listen: function (req, res) {
    if (req.isSocket) {
      console.dir("Ergebnis:" + req);
      todoitem.watch(req);
      var testArray = [];
      for (var i = 1; i < 100; i++) {
        testArray.push(i);
      }
      todoitem.subscribe(req, testArray);
      sails.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'todoitem\'.');
    }
  },


  view: function (req, res) {
    var todoID = req.param('todoItemID', null);

    todoitem.findOne(todoID).done(function (err, model) {
      res.render('meeting/view',
        {
          'model': model
        });
    });
  },


  delete: function (req, res) {
    var id = req.param('id', null);
    if (id && req.isSocket) {
      todoitem.findOne(id).exec(function findMeetingSeries(err, todoitemAnswer) {
        todoitem.destroy({id: todoitemAnswer.id}).exec(function (err, todoitemAnswer) {
          if (err) {
            sails.log('Error while deleting todoitem');
            res.send('Error');
          }
          else {
            sails.log('Successfully deleted ' + id);


            todoitem.publishDestroy(todoitemAnswer[0].id, undefined,
              {
                previous: {
                  id: todoitemAnswer[0].id,
                  title: todoitemAnswer[0].title,
                  done: todoitemAnswer[0].done,
                  description: todoitemAnswer[0].description,
                  owner: todoitemAnswer[0].owner,
                  author: todoitemAnswer[0].author,
                  assignee: todoitemAnswer[0].assignee,
                  important: todoitemAnswer[0].important,
                }
              });

          }
        });
      });
    }
    else {
      res.send('todoitem');
      console.log('ToDoItem not created: too few parameters');
    }
  },
};
