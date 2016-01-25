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
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    displayName: {
      type: 'string',
      required: true
    },
    todos: {
      model: 'todoitem'
    },
    meetings: {
      collection: 'meetingseries',
      via: 'members',
      dominant: true
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
        displayName: inputs.displayName,
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

