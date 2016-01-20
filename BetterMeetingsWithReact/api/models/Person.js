/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'person',

  attributes: {
  	personID: {
  		type: 'integer',
  		autoIncrement: true,
  		required: true,
  		primaryKey: true
  	},
  	displayName: {
  		type: 'integer',
  		unique: true,
  		required: true
  	},
  	assignedMeetings: {
  		type: 'array',
  		required: false
  	},
    todos: {
      model: 'todoitem'
    }
  }
};

