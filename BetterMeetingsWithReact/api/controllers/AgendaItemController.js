/**
 * AgendaItemController
 *
 * @description :: Server-side logic for managing Agendaitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  create: function(req,res) {
    if (req.method == "POST" && req.param( "AgendaItem" , null ) != null ) {
      AgendaItem.create( req.param("AgendaItem") ).done( function( err , model ) {
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
    var todoID = req.param("AgendaItemID", null);

    AgendaItem.findOne(todoID).done(function(err,model) {
      if (req.method == "POST" && req.param("AgendaItem",null) != null) {
        var item = req.param("AgendaItem",null);
        model.title = item.title;
        model.description = item.description;
        model.todos = item.todos;
        model.done = item.done;

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
    var todoID = req.param("AgendaItemID", null);

    AgendaItem.findOne(todoID).done(function(err,model) {
      res.render('meeting/view', {'model':model});
    });
  },

  delete: function(req,res) {
    var todoID = req.param("AgendaItemID", null);

    AgendaItem.findOne(todoID).done(function(err,user) {
      user.destroy(function(err) {
        res.send("Success");
      });
    });
  },

  /**
   * `AgendaItemController.isDone()`
   */
  isDone: function (req, res) {
    return res.json({
      todo: 'isDone() is not implemented yet!'
    });
  },


  /**
   * `AgendaItemController.setDone()`
   */
  setDone: function (req, res) {
    return res.json({
      todo: 'setDone() is not implemented yet!'
    });
  }
};

