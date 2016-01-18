/**
* Meeting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	meetingID: {
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true
  	},
  	members: {
  		type: 'array',
  		required: true,
  	},
  	topics: {
  		type: 'array',
  		required: false,
  	},
  	jourFixe: {
  		type: 'integer',
  		required: true,
  	},
  	url: {
  		type: 'string',
  		required: true,
  	},
  	timer: {
  		type: 'integer',
  		required: true,
  	}

  }
};

