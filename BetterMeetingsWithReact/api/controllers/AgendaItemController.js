/**
 * AgendaItemController
 *
 * @description :: Server-side logic for managing Agendaitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*====================================================================
=            create single instance of agendaitem (Radscheit)         =
====================================================================*/


  create: function(req,res) {

    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    // var todos = req.param('todos'),

    if ( meetingseries && title && description && todos ) {

      AgendaItem.create({
        meetingseries:      meetingseries,
        title:        title,
        description:  description,
        //todos:      todos,
      }).exec( function createAgendaItem(err,cre) {
        if (err) console.log('[bm-error] agendaitem not created: ' + err);
        
        console.log('[bm-success] agendaitem ' + cre.title + 'created');

        /**
        
          TODO:
          - add watch for realtime view
          - add a redirect to a view if needed
        
         */
        
      });
    };

  },

/*===============================================================
=            create instances of agendaitem on bulk (Radscheit)            =
===============================================================*/


  bulkcreate: function(req,res) {

    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    // var todos = req.param('todos'),

    if ( meetingseries && title && description && todos ) {

      AgendaItem.create({
        meetingseries:      meetingseries,
        title:        title,
        description:  description,
        //todos:      todos,
      }).exec( function createAgendaItem(err,cre) {
        if (err) console.log('[bm-error] agendaitem not created: ' + err);
        
        console.log('[bm-success] agendaitem ' + cre.title + 'created');
      });
    };

  },

  update: function(req,res) {
   
  },

  view: function(req,res) {

  },

  delete: function(req,res) {

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

