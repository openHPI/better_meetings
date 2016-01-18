/**
* ToDoItem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'todoitem',

  attributes: {
  	todoItemID: {
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true,
  		required: true
  	},
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
  	assignee: {
  		type: 'integer',
  		required: false
  	},
  	done: {
  		type: 'boolean',
  		required: true
  	}
  }
};

