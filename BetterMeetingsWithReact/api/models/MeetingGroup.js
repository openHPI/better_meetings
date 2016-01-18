/**
* MeetingGroup.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'meetinggroup',

  attributes: {
  	meetingID: {
  		type: 'integer',
  		required: true
  	},
  	adminMembers: {
  		type: 'array',
  		required: true,
  	},
  	guestMembers: {
  		type: 'array',
  		required: false
  	}
  }
};

