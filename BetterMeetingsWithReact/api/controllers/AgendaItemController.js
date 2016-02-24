/**
 * AgendaItemController
 *
 * @description :: Server-side logic for managing Agendaitems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


  create: function (req, res) {
    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    var todos = req.param('todos');
    var subAgendaItems = req.param('subAgendaItems');
    if (meetingseries && title) {
      AgendaItem.create(
        {
          meetingseries: meetingseries,
          title: title,
          description: description,
          todos: todos,
          subAgendaItems: subAgendaItems,
        })
        .exec(function createAgendaItem(err, created) {
          if (err) {
            sails.log('agendaitem not created: ' + err);
          }
          else {
            sails.log('agendaitem ' + created.title +
              'created');
            agendaitem.publishCreate(
              {
                id: created.id,
                meetingseries: created.meetingseries,
                title: created.title,
                description: created.description,
                todos: created.todos,
                subAgendaItems: created.subAgendaItems,
              });
          }
        });
    }
    else if (req.isSocket) {
      sails.log('AgendaItem with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'agendaitem\'.');
    }
    else {
      res.send('agendaitem');
      sails.log('AgendaItem not created: too few parameters');
    }
  },


  bulkcreate: function (req, res) {
    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    // var todos = req.param('todos'),
    if (meetingseries && title && description && todos) {
      AgendaItem.create(
        {
          meetingseries: meetingseries,
          title: title,
          description: description,
        })
        .exec(function createAgendaItem(err, cre) {
          if (err) sails.log('agendaitem not created: ' + err);
          sails.log('agendaitem ' + cre.title + 'created');
        });
    }
  },

  update: function (req, res) {
    var id = req.param('id');
    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    var todos = req.param('todos');
    var done = req.param('done');
    var subAgendaItems = req.param('subAgendaItems');
    if (id && meetingseries && title && description && todos &&
      subAgendaItems && req.isSocket) {
      agendaitem.update(
        {
          'id': id
        },
        {
          meetingseries: meetingseries,
          title: title,
          description: description,
          todos: todos,
          done: done,
          subAgendaItems: subAgendaItems,
        })
        .exec(function updateAgendaItem(err, updated) {
          if (err) {
            sails.log('AgendaItem not updated ' + err);
          }
          else if (!updated) {
            sails.log('Update error for Person ' + err);
          }
          else {
            sails.log('Updated AgendaItem: ' + updated.title);
            AgendaItem.publishUpdate(id,
              {
                meetingseries: updated.meetingseries,
                title: updated.title,
                description: updated.description,
                todos: updated.todos,
                done: updated.done,
                subAgendaItems: updated.subAgendaItems,
              });
          }
        });
    }
    else {
      res.send('agendaitem');
      sails.log('AgendaItem not updated: too few parameters');
    }
  },


  view: function (req, res) {
    var id = req.param('id'.null);
    AgendaItem.findOne(id).exec(function displayList(err, items) {
      sails.log(items);
      res.response = items;
      res.render('agendaitem',
        {
          'model': 'agendaitem'
        });
    });
  },


  delete: function (req, res) {
    var agendaItemID = req.param('agendaItemID', null);
    if (agendaItemID && req.isSocket) {
      AgendaItem.findOne(agendaItemID).exec(function findAgendaItem(err, agendaItemAnswer) {
        agendaitem.destroy(
          {
            id: agendaItemAnswer.id
          })
          .exec(function destroy(err) {
            if (err) {
              sails.log('Error while deleting agendaitem');
              res.send('Error');
            }
            else {
              sails.log('Successfully deleted ' + agendaitemID);
              agendaitem.publishDestroy(
                {
                  id: agendaItemAnswer.id
                });
            }
          });
      });
    }
  },


  uploadAttachedFile: function (req, res) {
    req.file('attachedFile').upload(
      {
        maxBytes: 10000000,
        dirname: require('path').resolve(sails.config.appPath,
          '/assets/agendaitem/')
      },
      function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }
        agendaitem.update(req.session.me,
          {
            attachedFileUrl: require('util').format(
              '%s/assets/agendaItemFiles/%s', sails.getBaseUrl(), req
                .session.me),
            attachedFileFd: uploadedFiles[0].fd
          })
          .exec(function (err) {
            if (err) return res.negotiate(err);
            return res.ok();
          });
      });
  },


  attachedFile: function (req, res) {
    req.validate(
      {
        id: 'string'
      });
    agendaitem.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      if (!user.attachedFileFd) {
        return res.notFound();
      }
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);
      fileAdapter.read(agendaitem.attachedFileFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  },


  subscribe: function (req, res) {
    if (req.isSocket) {
      agendaitem.watch(req);
      sails.log('User with socket id ' + sails.sockets.id(req) +
        ' is now subscribed to the model class \'agendaitem\'.');
    }
  },


  isDone: function (req, res) {
    return res.json(
      {
        todo: 'isDone() is not implemented yet!'
      });
  },


  setDone: function (req, res) {
    return res.json(
      {
        todo: 'setDone() is not implemented yet!'
      });
  }
};
