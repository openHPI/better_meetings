


var guestCounter = 0;

module.exports = {
	
	// Creates a Person and 
	// automatically adds it to the attendees of the belonging meeting
	// async.map()
	createAttendee: function(input) {
		var name = input.name
		var password = input.password;
		var email = input.email;
		var currentMeeting = input.meeting;

		if (!currentMeeting) {
			console.log("Error: No Meeting provided for PersonService");
		}

		// check for known person
		if (name && password && email) {
			person.findOrCreate({name: name, password: password, email: email}).exec(function findCreatePerson(error, createdOrFoundPerson){
  				if (error) {
  					sails.log("Error while creating Person in PersonService");
  				} else {
  					sails.log("Successfully created or found " + createdOrFoundPerson.name);
  					person.publishCreate({
  					  id: createdOrFoundPerson.id,
  					  name: createdOrFoundPerson.name,
  					  password: createdOrFoundPerson.password,
  					  email: createdOrFoundPerson.email,
  					});
  					// add created/found Person to attendees of meeting
  					meeting.findOne(currentMeeting).exec(function(err, meetingAnswer) {
  						if (err) {
  							console.log("Error: no correct Meeting found in PersonService");
  						} else {
  							meeting.update({id: currentMeeting, attendees: createdOrFoundPerson.id});
  							sails.log("Successfully added new attendee " + createdOrFoundPerson.name + " to meeting");
  						}
  					});
  				}
			});
		} else if (name && email) {
			// create guest person
			person.findOrCreate({name: name, email: email}).exec(function findCreatePerson(error, createdOrFoundPerson){
  				if (error) {
  					sails.log("Error while creating Person in PersonService");
  				} else {
  					sails.log("Successfully created or found " + createdOrFoundPerson.name);
  					person.publishCreate({
  					  id: createdOrFoundPerson.id,
  					  name: createdOrFoundPerson.name,
  					  email: createdOrFoundPerson.email,
  					});
  					// add created/found Person to attendees of meeting
  					meeting.findOne(currentMeeting).exec(function(err, meetingAnswer) {
  						if (err) {
  							console.log("Error: no correct Meeting found in PersonService");
  						} else {
  							meeting.update({id: currentMeeting, attendees: createdOrFoundPerson.id});
  							sails.log("Successfully added new attendee " + createdOrFoundPerson.name + " to meeting");
  						}
  					});
  				}
			});
		} else if (name) {
			// create guest person
			person.create({name: name}).exec(function createGuestPerson(error, createdGuestPerson){
				if (error) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					person.publishCreate({
					  id: createdGuestPerson.id,
					  name: createdGuestPerson.name,
					});
					// add created Person to attendees of meeting
					meeting.findOne(currentMeeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meeting.update({id: currentMeeting, attendees: createdGuestPerson.id});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		} else if (email) {
			// create guest person, assign a self created name for guest for usability
			guestCounter++;
			var guestName = "Guest" + guestCounter.toString();
			
			person.findOrCreate({email: email}, {email: email, name: guestName}).exec(function findCreatePerson(error, createdOrFoundPerson){
  				if (error) {
  					sails.log("Error while creating Person in PersonService");
  				} else {
  					sails.log("Successfully created or found " + createdOrFoundPerson.name);
  					person.publishCreate({
  					  id: createdOrFoundPerson.id,
  					  name: createdOrFoundPerson.name,
  					  email: createdOrFoundPerson.email,
  					});
  					// add created/found Person to attendees of meeting
  					meeting.findOne(currentMeeting).exec(function(err, meetingAnswer) {
  						if (err) {
  							console.log("Error: no correct Meeting found in PersonService");
  						} else {
  							meeting.update({id: currentMeeting, attendees: createdOrFoundPerson.id});
  							sails.log("Successfully added new attendee " + createdOrFoundPerson.name + " to meeting");
  						}
  					});
  				}
			});
		} else {
			// create guest person, assign a self created name for guest
			guestCounter++;
			var guestName = "Guest" + guestCounter.toString();
			
			person.create({name: guestName}).exec(function createGuestPerson(error, createdGuestPerson){
				if (error) {
					sails.log("Error while creating Guest-Person in PersonService");
				} else {
					sails.log("Successfully created " + createdGuestPerson.name);
					person.publishCreate({
					  id: createdGuestPerson.id,
					  name: createdGuestPerson.name,
					});
					// add created Person to attendees of meeting
					meeting.findOne(currentMeeting).exec(function(err, meetingAnswer) {
						if (err) {
							console.log("Error: no correct Meeting found in PersonService");
						} else {
							meeting.update({id: currentMeeting, attendees: createdGuestPerson.id});
							sails.log("Successfully added new attendee " + createdGuestPerson.name + " to meeting");
						}
					});
				}
			});
		}


	}



}