/**
 * AgendaItem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  identity: 'agendaitem',

  attributes: {

    meetingseries: {
      model: 'meetingseries',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    todos: {
      collection: 'todoitem',
      via: 'owner'
    },
    subAgendaItems: {
      type: 'array'
    },
    done: {
      type: 'boolean',
      required: false
    },
    attachedFile: {
      type: 'string',
      required: false,
      unique: true
    },
    note: {
      type: 'string'
    }
  }
};

