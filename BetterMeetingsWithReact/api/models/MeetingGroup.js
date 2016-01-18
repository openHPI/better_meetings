/**
* MeetingGroup.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'meetinggroup',

  attributes: {
  	meeting: {
      model: 'meeting',
  	},
  	adminMembers: {
  		collection: 'meetingadmin',
  		via: 'meetings',
  	},
  	guestMembers: {
      collection: 'meetingguest',
      via: 'meetings',
  	}
  }
};

