/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
create: function(req,res) {
	  
	  var nameSent = req.param('name');

	  if (nameSent && req.isSocket){

		  User.create({name: params.name}).exec(function createCB(err,created){

			  	User.publishCreate({
			  	     	id: created.id,
			  	     	name: created.name,
			  	     });	
		     return res.json({
		       notice: 'Created user with name ' + created.name
		     });
		   });
		} else if (req.isSocket){

		         User.watch(req);
		         console.log('User with socket id '+sails.sockets.id(req)+' is now subscribed to the model class \'users\'.');

		} else {
					console.log('view')
		         //res.view();
       }
	   
	   
	      
	    
	
	},
	view: function(req,res) {
	  var userID = req.param("userID", null);

	  User.findOne(userID).done(function(err,model) {
	    res.render('user', {'model':model});
	  });
	},

	delete: function(req,res) {
	  var userID = req.param("userID", null);

	  User.findOne(userID).done(function(err,user) {
	    user.destroy(function(err) {
	      res.send("Success");
	    });
	  });
	},

	displayAll: function (req,res) {

		User.find(function storedUsers(err,users) {
			User.subscribe(req.socket);
			User.subscribe(req.socket, users);
		})
	}
};

