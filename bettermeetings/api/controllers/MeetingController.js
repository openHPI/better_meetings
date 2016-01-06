/**
 * MeetingController
 *
 * @description :: Server-side logic for managing meetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

   create: function (req, res) {
      var response = (req.param('name')) ? req.param('name') : 'Unbenanntes Projekt';
      return res.json({
         todo: 'Not implemented yet',
         response: response,
      })
   },

   show: function (req, res) {

      return res.json({
         todo: 'Show ist noch nicht implementiert',
      })
   }

};

