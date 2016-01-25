/**
 * ExampledataService
 *
 */

module.exports = {

    generateExamplePersons: function (req,res) {
    	
        var person1 = {
            'email': 'test1@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 1',
            };
        var person2 = {
            'email': 'test2@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 2',
            };
        var person3 = {
            'email': 'test3@hpi.de',
            'password': 'password',
            'displayName': 'TestAdmin 3',
            };
        var persons = [person1, person2, person3];

        for (var i = 0; i < 3; i++) {
          var displayname =    persons[i].displayName;
          var password =      persons[i].password;
          var email =          persons[i].email;
          
          person.create({
            displayname:    displayname,
            password:       password,
            email:          email,
          }).exec( function createPerson(err, cre) {
            if (err) {
              sails.log('person not created' + err);
            } else {
              sails.log('person created: ' + cre.displayname);
              // return res.view('persons', {
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
         'title': 'Topic 2',
         'description': 'Lorem Ipsum Dolor.',
         };
      var topic3 = {
         'meeting': 1,
         'title': 'Topic 3',
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
       	}).exec( function createAgendaItems(err,cre) {
         	if (err) {
           		sails.log('AgendaItem not created' + err);
         	} else {
           		sails.log('AgendaItem created: ' + cre.displayname);
         	}
       	})
     	};
      return res.send('Toll');  
      
    },

    generateExampleMeeting: function (req,res) {
    	
      var meetingseries1 = {
         'title': 'Testmeeting',
         'description': 'Lorem ipsum dolor.',
         'topics': topics1,
         'meeting': meeting1,
         'url': UrlService.generateurl(),
         'timer': 600,
      };
   

     
      var title = meetingseries1.title;
      var description = meetingseries1.description;
      var topics = meetingseries1.topics;
      var jourfixe = meetingseries1.meeting;
      var url = meetingseries1.url;
      var timer = meetingseries1.timer;

       meetingseries.create({
         title:    		title,
         description:   description,
         topics:        topics,
         meeting: 		meeting,
         url: 				url,
         timer: 			timer,
       }).exec( function createMeetingSeries(err,cre) {
         if (err) {
           sails.log('MeetingSeries not created' + err);
         } else {
           sails.log('MeetingSeries created: ' + cre.displayName);
           // return res.view('meetingseries', {
           //   users: cre,
           // });
         }
       });
   return res.redirect('/meetingseries/' + url);  
      
    },

};