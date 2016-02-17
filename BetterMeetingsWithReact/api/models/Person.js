/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  identity: 'person',

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: false
    },
    name: {
      type: 'string',
      required: false
    },
    todos: {
      collection: 'todoitem'
    },
    assignedMeetings: { // former meetings
      collection: 'meeting',
      via: 'attendees',
      dominant: true
    },
    createdMeetings: {
      collection: 'meetingseries',
      via: 'admins'
    },
    isAdmin: {
      type: 'boolean',
    },
  },

  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a person
    person.create({
        name: inputs.name,
        email: inputs.email,
        // TODO: But encrypt the password first
        password: inputs.password,
        isAdmin: true,
      })
      .exec(cb);
  },


  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLoginEmail: function (inputs, cb) {
    // Create a person
    person.findOne({
        email: inputs.email
      })
      .populateAll()
      .exec(cb);
  },

  attemptLoginAdmin: function (inputs, cb) {
    // Create a person
    person.findOne({
        email: inputs.email,
        // TODO: But encrypt the password first
        password: inputs.password
      })
      .populateAll()
      .exec(cb);
  },

  attemptLoginGuestOrCreate: function (inputs, cb) {
    // Create a person
    person.findOrCreate({
        name: inputs.name,
        email: inputs.email,
        isAdmin: false
      })
      .exec(cb);
  }
};

