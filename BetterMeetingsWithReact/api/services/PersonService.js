


var guestCounter = 0;

module.exports = {
	
	// Creates a Person and 
	// automatically adds it to the attendees of the belonging meeting
	// async.map()
	createAttendee: function(input) {
		var name = input.param('name');
		var password = input.param('password');
		var email = input.param('email');
		var meeting = input.param("meeting");

		if (!meeting) {
			console.log("Error: No Meeting provided for PersonService");
		}

		// check for known person
		if (name && password && email) {
			Person.findOrCreate({name: name, password: password, email: email}).exec(function findCreatePerson(error, createdOrFoundPerson){
  				if (err) {
  					sails.log("Error while creating Person in PersonService");
  				} else {
  					sails.log("Successfully created or found " + createdOrFoundPerson.name);
  					var personID = createdOrFoundPerson.id;
  					// add created/found Person to attendees of meeting
  					Meeting.findOne(meeting).exec(function(err, meetingAnswer) {
  						if (err) {
  							console.log("Error: no correct Meeting found in PersonService");
  						} else {
  							meetingAnswer.update({attendees: personID});
  							sails.log("Successfully added new attendee " + createdOrFoundPerson.name + " to meeting");
  						}
  					});
  				}
			});
		} else if (name && email) {
			// create guest person
			Person.createGuest({name: name, email: email}).exec(function createGuestPerson(error, createdGuestPerson){
				if (err) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					var personID = createdGuestPerson.id;
					// add created Person to attendees of meeting
					Meeting.findOne(meeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meetingAnswer.update({attendees: personID});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		} else if (name) {
			// create guest person
			Person.createGuest({name: name}).exec(function createGuestPerson(error, createdGuestPerson){
				if (err) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					var personID = createdGuestPerson.id;
					// add created Person to attendees of meeting
					Meeting.findOne(meeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meetingAnswer.update({attendees: personID});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		} else if (email) {
			// create guest person, assign a self created name for guest for usability
			guestCounter++;
			var guestName = "Guest" + guestCounter.toString();
			
			Person.createGuest({name: guestName, email: email}).exec(function createGuestPerson(error, createdGuestPerson){
				if (err) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					var personID = createdGuestPerson.id;
					// add created Person to attendees of meeting
					Meeting.findOne(meeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meetingAnswer.update({attendees: personID});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		} else {
			// create guest person, assign a self created name for guest
			guestCounter++;
			var guestName = "Guest" + guestCounter.toString();
			
			Person.createGuest({name: guestName}).exec(function createGuestPerson(error, createdGuestPerson){
				if (err) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					var personID = createdGuestPerson.id;
					// add created Person to attendees of meeting
					Meeting.findOne(meeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meetingAnswer.update({attendees: personID});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		}


	}



}