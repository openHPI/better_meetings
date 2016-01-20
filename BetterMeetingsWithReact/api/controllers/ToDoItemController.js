/**
 * ToDoItemController
 *
 * @description :: Server-side logic for managing Todoitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  create: function(req,res) {
    if (req.method=="POST"&&req.param("ToDoItem",null)!=null) {
      ToDoItem.create(req.param("ToDoItem")).done(function(err,model) {
        if (err) {
          res.send("Error");
        } else {
          res.send("Success");
        }
      });
    } else {
      res.render('person/create');
    }
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

