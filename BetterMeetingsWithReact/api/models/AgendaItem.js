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
      required: true,
    },
    title: {
  		type: 'string',
  		required: true,	
  	},
  	description: {
  		type: 'string',
  		required: false,
  	},
  	todos: {
  		collection: 'todoitem',
  		via: 'owner',
  	},
  	done: {
  		type: 'boolean',
  		required: false,
  	}

  }
};

