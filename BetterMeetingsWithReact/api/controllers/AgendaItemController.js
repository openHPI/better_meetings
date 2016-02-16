/**
 * AgendaItemController
 *
 * @description :: Server-side logic for managing Agendaitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  create: function(req, res) {

    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    var todos = req.param('todos');
    var subAgendaItems = req.param('subAgendaItems');

    if (meetingseries && title) {

      AgendaItem.create({
        meetingseries:      meetingseries,
        title:              title,
        description:        description,
        todos:              todos,
        subAgendaItems:     subAgendaItems,

      }).exec( function createAgendaItem(err, created) {
        if (err) { 
          console.log('[bm-error] agendaitem not created: ' + err);
        } else {
          console.log('[bm-success] agendaitem ' + created.title + 'created');
          agendaitem.publishCreate({
            id:                 created.id,
            meetingseries:      created.meetingseries,
            title:              created.title,
            description:        created.description,
            todos:              created.todos,
            subAgendaItems:     created.subAgendaItems,
          });
        }  
      });
    } else if (req.isSocket) {
      sails.log('AgendaItem with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'agendaitem\'.');
    } else {
      res.send('agendaitem');
      console.log('AgendaItem not created: too few parameters');
    }
  },

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
    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    var todos = req.param('todos');
    var done = req.param('done');
    var subAgendaItems = req.param('subAgendaItems');
    var id = req.param('id');

    if (id && meetingseries && title && description && todos && subAgendaItems && req.isSocket) {
      agendaitem.update({'id': id}, {
        meetingseries:    meetingseries,
        title:            title,
        description:      description,
        todos:            todos,
        done:             done,
        subAgendaItems:   subAgendaItems,
      }).exec(function updateAgendaItem(err, updated) {
        if (err) {
          sails.log('AgendaItem not updated ' + err);
          //res.redirect('/agendaitem/edit');
        } else if (!updated) {
          sails.log('Update error for Person ' + err);
          //res.redirect('/agendaitem/edit');
        } else {
          sails.log('Updated AgendaItem: ' + updated.title);
          AgendaItem.publishUpdate(id, {
            meetingseries:  updated.meetingseries,
            title:          updated.title,
            description:    updated.description,
            todos:          updated.todos,
            done:           updated.done,
            subAgendaItems: updated.subAgendaItems,
          });
        }
      });
    } else {
        res.send('agendaitem');
        //res.redirect('/agendaitem/view/'+id);
        sails.log('AgendaItem not updated: too few parameters');
      }
  },

  view: function(req,res) {
      //agendaItem.watch(req);

      var id = req.param('id'. null);
      AgendaItem.findOne(id).exec(function displayList(err, items) {
        console.log(items);
        res.response = items;
        res.render('agendaitem', {'model': 'agendaitem'});
      });
  },

  delete: function(req,res) {
    var agendaItemID = req.param("agendaItemID", null);
    if (agendaItemID && req.isSocket) {
      AgendaItem.findOne(agendaItemID).exec(function findAgendaItem(err, agendaItemAnswer) {
        agendaitem.destroy({id: agendaItemAnswer.id}).exec(function destroy(err) {
          if (err) {
            sails.log('Error while deleting agendaitem');
            res.send("Error");
          } else {
            sails.log("Successfully deleted " + agendaitemID);
            agendaitem.publishDestroy({id: agendaItemAnswer.id});   
          }
        });
      });
    }
  },


  // viewAll: function(req,res) {
  //   agendaitem.find().exec(function displayAgendaItemList(err, items) {
  //     if (err) return res.serverError(err);
  //     sails.log('person:' + items);
  //     AgendaItem.subscribe(req.socket);
  //     AgendaItem.subscribe(req.socket, items);
  //     return res.view('agendaitem', {
  //       users: items,
  //     });
  //   });
  // },

  subscribe: function(req,res) {
    if (req.isSocket) {
      agendaitem.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'agendaitem\'.');
   }
  },

  isDone: function (req, res) {
    return res.json({
      todo: 'isDone() is not implemented yet!'
    });
  },

  setDone: function (req, res) {
    return res.json({
      todo: 'setDone() is not implemented yet!'
    });
  }
};

