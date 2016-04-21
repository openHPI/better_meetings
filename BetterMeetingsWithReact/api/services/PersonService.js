var guestCounter = 0;

module.exports = {
  // Creates a Person and
  // automatically adds it to the attendees of the belonging meeting
  // async.map()
  createAttendee: function (input) {
    var name = input.name;
    var password = input.password;
    var email = input.email;
    var currentMeeting = input.meeting;
    var attendees;
    var guestName;
    console.log(name + " " + email + " " + password);

    if (!currentMeeting) {
      console.log('Error: No Meeting provided for PersonService');
    }

    // check for known person
    if (name && password && email) {
      return person.findOrCreate({
        name: name,
        password: password,
        email: email
      }).exec(function findCreatePerson(error, createdOrFoundPerson) {
        if (error) {
          sails.log('Error while creating Person in PersonService');
        } else {
          sails.log('Successfully created or found ' + createdOrFoundPerson.name);
          console.log(createdOrFoundPerson.name + " " + createdOrFoundPerson.email + " " + createdOrFoundPerson.password);
          person.publishCreate({
            id: createdOrFoundPerson.id,
            name: createdOrFoundPerson.name,
            password: createdOrFoundPerson.password,
            email: createdOrFoundPerson.email
          });

          // add created/found Person to attendees of meeting
          return meeting.findOne(currentMeeting).exec(function (err) {
            if (err) {
              console.log('Error: no correct Meeting found in PersonService');
            } else {
              return meeting.update({
                id: currentMeeting,
                attendees: createdOrFoundPerson.id
              }).exec(function (errUpdateMeeting) {
                if (!errUpdateMeeting) {
                  sails.log('Successfully added new attendee ' + createdOrFoundPerson.name + ' to meeting');
                }
                person.publishCreate({
                  id: createdOrFoundPerson.id,
                  name: createdOrFoundPerson.name,
                  email: createdOrFoundPerson.email
                });
              });
            }
          });
        }
      });
    } else if (name && email) {
      // create guest person
      return person.findOrCreate({
        name: name,
        email: email
      }).exec(function findCreatePerson(error, createdOrFoundPerson) {
        if (error) {
          sails.log('Error while creating Person in PersonService');
        } else {
          sails.log('Successfully created or found' + createdOrFoundPerson.name);
            console.log(createdOrFoundPerson.name + " " + createdOrFoundPerson.email);

          person.publishCreate({
            id: createdOrFoundPerson.id,
            name: createdOrFoundPerson.name,
            email: createdOrFoundPerson.email
          });

          // add created/found Person to attendees of meeting
          return meeting.findOne(currentMeeting).populateAll().exec(function (err, meetingAnswer) {
            if (err) {
              console.log('Error: no correct Meeting found in PersonService');
            } else {
              attendees = meetingAnswer.attendees;
              attendees.push(createdOrFoundPerson);
              return meeting.update({ id: currentMeeting }, { attendees: attendees })
                .exec(function afterwards(updateErr, updated) {
                  if (updateErr) {
                    sails.log(updateErr);
                    // handle error here- e.g. `res.serverError(err);`
                    return;
                  }

                  if (!updated) {
                    sails.log('failed to add' + createdOrFoundPerson.name + 'to attendees');
                  } 
                });
            }
          });
        }
      });
    } else if (name) {
      // create guest person
      return person.create({ name: name }).exec(function createGuestPerson(error, createdGuestPerson) {
        if (error) {
          sails.log('Error while creating Guest-Person in PersonService');
        } else {
          sails.log('Successfully created ' + createdGuestPerson.name);
          person.publishCreate({
            id: createdGuestPerson.id,
            name: createdGuestPerson.name
          });
          // add created Person to attendees of meeting
          return meeting.findOne(currentMeeting).exec(function (err) {
            if (err) {
              console.log('Error: no correct Meeting found in PersonService');
            } else {
              return meeting.update({
                id: currentMeeting,
                attendees: createdGuestPerson.id
              }).exec(function (errUpdateMeeting) {
                if (!errUpdateMeeting) {
                  sails.log('Successfully added new attendee ' + createdGuestPerson.name + ' to meeting');
                }
              });
            }
          });
        }
      });
    } else if (email) {
      // create guest person, assign a self created name for guest for usability
      guestCounter++;
      guestName = 'Guest' + guestCounter.toString();

      return person.findOrCreate({ email: email }, {
        email: email,
        name: guestName
      }).exec(function findCreatePerson(error, createdOrFoundPerson) {
        if (error) {
          sails.log('Error while creating Person in PersonService');
        } else {
          sails.log('Successfully created or found ' + createdOrFoundPerson.name);
          person.publishCreate({
            id: createdOrFoundPerson.id,
            name: createdOrFoundPerson.name,
            email: createdOrFoundPerson.email
          });
          // add created/found Person to attendees of meeting
          return meeting.findOne(currentMeeting).exec(function (err) {
            if (err) {
              console.log('Error: no correct Meeting found in PersonService');
            } else {
              return meeting.update({
                id: currentMeeting,
                attendees: createdOrFoundPerson.id
              }).exec(function (errUpdateMeeting) {
                if (!errUpdateMeeting) {
                  sails.log('Successfully added new attendee ' + createdOrFoundPerson.name + ' to meeting');
                }
              });
            }
          });
        }
      });
    } else {
      // create guest person, assign a self created name for guest
      guestCounter++;
      guestName = 'Guest' + guestCounter.toString();

      return person.create({ name: guestName }).exec(function createGuestPerson(error, createdGuestPerson) {
        if (error) {
          sails.log('Error while creating Guest-Person in PersonService');
        } else {
          sails.log('Successfully created ' + createdGuestPerson.name);
          person.publishCreate({
            id: createdGuestPerson.id,
            name: createdGuestPerson.name
          });
          // add created Person to attendees of meeting
          return meeting.findOne(currentMeeting).exec(function (err) {
            if (err) {
              console.log('Error: no correct Meeting found in PersonService');
            } else {
              return meeting.update({
                id: currentMeeting,
                attendees: createdGuestPerson.id
              }).exec(function (errUpdateMeeting) {
                if (!errUpdateMeeting) {
                  sails.log('Successfully added new attendee ' + createdGuestPerson.name + ' to meeting');
                }
              });
            }
          });
        }
      });
    }
  }
};
