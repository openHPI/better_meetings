/**
 * ToDoItemController
 *
 * @description :: Server-side logic for managing Todoitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  create: function(req,res) {
    if (req.method == "POST" && req.param( "ToDoItem" , null ) != null ) {
      ToDoItem.create( req.param("ToDoItem") ).done( function( err , model ) {
        if ( err ) {
          res.send("Error");
        } else {
          res.send("Success");
        }
      });
    } else {
      res.render('person/create');
    }
  },

  update: function(req,res) {
    var todoID = req.param("todoItemID", null);

    ToDoItem.findOne(todoID).done(function(err,model) {
      if (req.method == "POST" && req.param("ToDoItem",null) != null) {
        var item = req.param("ToDoItem",null);
        model.title = item.title;
        model.description = item.description;
        model.owner = item.owner;
        model.assignee = item.assignee;
        model.author = item.author;
        model.done = item.done;

        model.save(function(err) {
          if (err) {
            res.send("Error");
          } else {
            res.send("Success");
          }
        });
      } else {
        res.render('todoitem/update',{'model':model});
      }
    })
  },

  subscribe: function(req,res) {
   if (req.isSocket) {
      todoitem.watch(req);
      console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'todoitem\'.');
   }
  }

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





  /**
   * `ToDoItemController.setAssignee()`
   */
  setAssignee: function (req, res) {
    return res.json({
      todo: 'setAssignee() is not implemented yet!'
    });
  },


  /**
   * `ToDoItemController.isDone()`
   */
  isDone: function (req, res) {
    return res.json({
      todo: 'isDone() is not implemented yet!'
    });
  },


  /**
   * `ToDoItemController.setDone()`
   */
  setDone: function (req, res) {
    return res.json({
      todo: 'setDone() is not implemented yet!'
    });
  }

};

