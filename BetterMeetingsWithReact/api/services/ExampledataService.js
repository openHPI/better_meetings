/**
 * ExampledataService
 *
 */

module.exports = {

    generateExamplePersons: function (req,res) {
    	
        var admin1 = {
            'email': 'test1@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 1',
            };
        var admin2 = {
            'email': 'test2@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 2',
            };
        var admin3 = {
            'email': 'test3@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 3',
            };
        var meetingAdmins = [admin1,admin2,admin3];

        for (var i = 0; i < 3; i++) {
          var displayname =    meetingAdmins[i].displayName;
          var password =      meetingAdmins[i].password;
          var email =          meetingAdmins[i].email;
          
          person.create({
            displayname:    displayname,
            password:       password,
            email:          email,
          }).exec( function createMeetingAdmin(err,cre) {
            if (err) {
              sails.log('person not created' + err);
            } else {
              sails.log('person created: ' + cre.displayname);
              // return res.view('meetingadmins', {
              //   users: cre,
              // });
            }
          })

        };
      return res.send('Toll');  
      
    },

    generateExampleTopics: function (req,res) {
    	
      var topic1 = {
         'meeting': 1,
         'title': 'Topic 1',
         'description': 'Lorem Ipsum Dolor.',
         };
      var topic2 = {
         'meeting': 1,
         'title': 'Topic 1',
         'description': 'Lorem Ipsum Dolor.',
         };
      var topic3 = {
         'meeting': 1,
         'title': 'Topic 1',
         'description': 'Lorem Ipsum Dolor.',
         };
     
      var topics = [topic1,topic2,topic3];

     	for (var i = 0; i < 3; i++) {
       	var meeting = meetingAdmins[i].meeting;
       	var title = meetingAdmins[i].title;
       	var description = meetingAdmins[i].description;
       
       	agendaitem.create({
         	meeting:    	meeting,
         	title:       	title,
         	description:   description,
       	}).exec( function createMeetingAdmin(err,cre) {
         	if (err) {
           		sails.log('person not created' + err);
         	} else {
           		sails.log('person created: ' + cre.displayname);
         	}
       	})
     	};
      return res.send('Toll');  
      
    },

    generateExampleMeeting: function (req,res) {
    	
      var meeting1 = {
         'title': 'Testmeeting',
         'description': 'Lorem ipsum dolor.',
         'topics': topics1,
         'jourfixe': jourfixe1,
         'url': UrlService.generateurl(),
         'timer': 600,
      };
   

     
      var title = meeting1.title;
      var description = meeting1.description;
      var topics = meeting1.topics;
      var jourfixe = meeting1.jourfixe;
      var url = meeting1.url;
      var timer = meeting1.timer;

       meeting.create({
         title:    		title,
         description:   description,
         topics:        topics,
         jourfixe: 		jourfixe,
         url: 				url,
         timer: 			timer,
       }).exec( function createMeetingAdmin(err,cre) {
         if (err) {
           sails.log('meeting not created' + err);
         } else {
           sails.log('meeting created: ' + cre.displayName);
           // return res.view('meetingadmins', {
           //   users: cre,
           // });
         }
       });
   return res.redirect('/meeting/' + url);  
      
    },

};