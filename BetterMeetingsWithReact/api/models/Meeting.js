/**
* Meeting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	identity: 'meeting',

  attributes: {

  	members: {
  		model: 'meetinggroup',
  	},
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
  	topics: {
  		model: 'agendaitem',
  		via: 'meeting',
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

