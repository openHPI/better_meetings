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
      email: true,
      required: false
    },
    password: {
      type: 'string',
      required: false
    },
    displayname: {
      type: 'string',
      required: false
    },
    todos: {
      model: 'todoitem'
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
        displayName: inputs.name,
        email: inputs.email,
        // TODO: But encrypt the password first
        password: inputs.password
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

  attemptLogin: function (inputs, cb) {
    // Create a person
    person.findOne({
        email: inputs.email,
        // TODO: But encrypt the password first
        password: inputs.password
      })
      .exec(cb);
  }
};

