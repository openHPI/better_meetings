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
    var note = req.param('note');

    if (title && owner && author && important != null && done != null) {
      todoitem.create(
        {
          title: title,
          description: description,
          owner: owner,
          author: author,
          assignee: assignee,
          done: done,
          important: important,
          note: note,
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
                important: created.important,
                note: created.note,
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
    var note = req.param('note');
    sails.log("after param assigmnment");


    if (todoItemId && title && done !== null && important != null && req.isSocket) {
      sails.log("number of params ok");
      todoitem.update({id: todoItemId}).set({
          title:        title,
          done:         done,
          description:  description,
          owner:        owner,
          author:       author,
          assignee:     assignee,
          important:    important,
          note:         note,
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
                note: updated[0].important,
              });
            }
          });
        }});
    } else {
      res.send('todoitem');
      sails.log('ToDoItem not updated: to few parameters');
    }
  },

  addNote: function (req, res) {
    var todoitemId = req.param('id');
    var note = req.param('note');

    if (todoitemId && note) {
      todoitem.update({id: todoitemId}).set({
        note: note
      })
      .exec(function addedNote(err, updated) {
        if (err) {
          sails.log('ToDoItem not updated ' + err);
        } else {
          sails.log('Updated ToDoItem: ' + updated[0].title);

          updated[0].save(function (err) {
            if (err) {
              sails.log("Error while saving update to ToDoItem " + updated[0].title);
            } else {
              sails.log("Successfully saved updates to ToDoItem " + updated[0].title);
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
      todoitem.find({}).exec(function (err, result) {
        if (!err) {
          var todoitemsToWatchFor = [];
          for (var item in result) {
            console.log(result[item].id);
            todoitemsToWatchFor.push(result[item].id);
          }
          todoitem.subscribe(req, todoitemsToWatchFor);
        } else {
          sails.log("Fehler");
        }
      });

      sails.log('User with socket id ' + sails.sockets.getId(req) +
        ' is now subscribed to the model class \'todoitem\'.');
    }
  },

  view: function (req, res) {
    person.findOne(req.session.me.id)
      .populate('todos')
      .exec(function found(err, person) {
        var todoitems;

        if (err) {
          sails.log.error('ERR:', err);
        }

        if (!person) {
          console.log('no person found');
          return;
        }

        todoitems = person.todos || [];

        todoitems.sort(function compare(a, b) {
          if (a.owner < b.owner) {
            return 1;
          } 
          else if (a.owner > b.owner) {
            return -1;
          }

          return 0;
        });

        return res.view('todos', {
          todoitems: todoitems
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
                  note: todoitemAnswer[0].note,
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
