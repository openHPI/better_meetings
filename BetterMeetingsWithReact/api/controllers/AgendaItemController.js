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
    var done = req.param('done');
    if (meetingseries && title && done != null) {
      AgendaItem.create(
        {
          meetingseries: meetingseries,
          title: title,
          description: description,
          todos: todos,
          subAgendaItems: subAgendaItems,
          done: done,
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
                done: done,
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
    var agendaItemId = req.param('id');
    var meetingseries = req.param('meetingseries');
    var title = req.param('title');
    var description = req.param('description');
    var todos = req.param('todos');
    var done = req.param('done');
    var subAgendaItems = req.param('subAgendaItems');
    if (agendaItemId && meetingseries && title && description && done != null && req.isSocket) {
      agendaitem.update({id: agendaItemId}).set({
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
          } else {
            sails.log('Updated AgendaItem: ' + updated[0].title);

            updated[0].save(function (err) {
              if (err) {
                sails.log("Error while saving update to AgendaItem " + updated[0].title);
              } else {
                sails.log("Successfully saved updates to AgendaItem " + updated[0].title);
                agendaitem.publishUpdate(updated[0].id, {
                  id:             updated[0].id,
                  meetingseries:  updated[0].meetingseries,
                  title:          updated[0].title,
                  description:    updated[0].description,
                  todos:          updated[0].todos,
                  done:           updated[0].done,
                  subAgendaItems: updated[0].subAgendaItems,
                });
              }
            });
          }
        });
    } else {
      res.send('agendaitem');
      sails.log('AgendaItem not updated: too few parameters');
    }
  },


  view: function (req, res) {
    var id = req.param('id'.null);
    agendaItem.findOne(id).exec(function displayList(err, items) {
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
      agendaItem.findOne(agendaItemID).exec(function findAgendaItem(err, agendaItemAnswer) {
        agendaitem.destroy({id: agendaItemAnswer.id}).exec(function destroy(err, agendaItemAnswer) {
            if (err) {
              sails.log('Error while deleting agendaitem');
              res.send('Error');
            }
            else {
              sails.log('Successfully deleted ' + agendaitemID);
              agendaitem.publishDestroy(agendaItemAnswer[0].id, undefined, {
                previous: {
                  title:          agendaItemAnswer[0].title,
                  meetingseries:  agendaItemAnswer[0].meetingseries,
                  description:    agendaItemAnswer[0].description,
                  done:           agendaItemAnswer[0].done,
                  todos:          agendaItemAnswer[0].todos,
                  subAgendaItems: agendaItemAnswer[0].subAgendaItems,
                }
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


  listen: function (req, res) {
    if (req.isSocket) {
      agendaitem.watch(req);
      var testArray = [];
      for (var i = 1; i < 100; i++) {
        testArray.push(i);
      }
      agendaitem.subscribe(req, testArray);
      sails.log('User with socket id ' + sails.sockets.getId(req) +
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
