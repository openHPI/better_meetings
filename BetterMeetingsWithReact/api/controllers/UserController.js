/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    var nameSent = req.param('name');
    console.log(req.param);
    console.log(nameSent);

    if (nameSent) {

      User.create({name: nameSent}).exec(function createCB(err, created) {
        if (err) console.log('Fehler: ', err);

        User.publishCreate({
          id: created.id,
          name: created.name,
        });
        return res.json({
          notice: 'Created user with name ' + created.name
        });
      });
    } else if (req.isSocket) {

      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'users\'.');

    } else {
      res.send('view')
      //res.view();

    }

  },
  view: function (req, res) {
    var id = req.param('id', null);
    User.findOne(id).exec(function displayList(err, items) {
      console.log(items);
      res.response = items;
      res.render('user', {'model': 'User'});

    })
  },

  viewAll: function (req, res) {
    var qrcode = QrCodeService.renderQrCode('http://localhost:1337/user', '250');

    User.find().exec(function displayList(err, items) {
      if (err) return res.serverError(err);

      console.log(items);
      return res.view(
        'user', {
          users: items,
          qr: qrcode,
        }
      );

    });
  },

  delete: function (req, res) {
    var userID = req.param("userID", null);

    User.findOne(userID).done(function (err, user) {
      user.destroy(function (err) {
        if (err) {
          sails.log('Error while deleting user');
          res.send("Error");
        }
        res.send("Success");
      });
    });
  },

  displayAll: function (req, res) {

    User.find(function storedUsers(err, users) {
      User.subscribe(req.socket);
      User.subscribe(req.socket, users);
    });
  },

  subscribe: function (req, res) {
    if (req.isSocket) {
      user.watch(req);
      console.log('User with socket id ' + sails.sockets.id(req) + ' is now subscribed to the model class \'user\'.');
    }
  },
};

