/**
 * PersonController
 *
 * @description :: Server-side logic for managing Dummydata
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  loadAll: function (req, res) {
    ExampledataService.generateExamplePersons(req, res);

    setTimeout(function () {
      ExampledataService.generateExampleMeetingSeries(req, res);

      setTimeout(function () {
        ExampledataService.generateExampleTopics(req, res);

        setTimeout(function () {
          ExampledataService.generateExampleTodoItems(req, res);

          setTimeout(function () {
            ExampledataService.generateExampleMeeting(req, res);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);

    res.send("Dummy data successfully created!");
  },

  deleteAll: function (req, res) {
    res.send("Dummy data deletion is not implemented yet!");
  }
};
