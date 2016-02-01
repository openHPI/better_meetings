/**
 * Meeting.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
// former Jourfix
module.exports = {

  identity: 'meeting',

  attributes: {

    topics: {
      collection: 'agendaitem'
    },
    attendees: {
      collection: 'person',
      via: 'assignedMeetings',
    },
    isInitialCreation: {
      type: 'boolean',
      required: true,
    },
    startTime: {
      type: 'datetime',
    },
  }
};
