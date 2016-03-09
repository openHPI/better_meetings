/**
 * ToDoItem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  identity: 'todoitem',

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
    owner: {
      model: 'agendaitem'
    },
    author: {
      model: 'person',
      via: 'todos',
    },
    assignee: {
      type: 'string',
      required: false
    },
    done: {
      type: 'boolean',
      required: true
    },
    important: {
      type: 'boolean',
      required: true
    },
    note: {
      type: 'string',
    },
  }
};

