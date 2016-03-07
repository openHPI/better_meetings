/**
 * MeetingSeries.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
// former MeetingGroup and former Meeting
module.exports = {

  identity: 'meetingseries',

  attributes: {
    members: {
      collection: 'person',
      via: 'assignedMeetings'
    },
    admins: {
      collection: 'person',
      via: 'createdMeetings',
      dominant: true
    },
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    topics: {
      collection: 'agendaitem',
      via: 'meetingseries'
    },
    instances: {
      collection: 'meeting',
      via: 'series'
    },
    timer: {
      type: 'integer',
      required: true
    },
    url: {
      type: 'string',
      required: false,
      unique: true,
    },
  }
};


