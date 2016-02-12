jQuery( document ).ready(function() {

	console.log('Admin.js wurde geladen...');

	/* Topic Modal */	

	jQuery( "#newTopicModalSubmit" ).click(function() {

		var meetingseries = jQuery( "#newTopicModal .id-input" ).val();
		var title = jQuery("#newTopicModal .title-input").val();
		var description = jQuery("#newTopicModal .description-textarea").val();

		jQuery.post( "meetingseries/create", { meetingseries: meetingseries, title: title, description: description, timer: timer, url: url } )
			.done( function( data ) {
				console.log( "Created Topic: " + data );
			});
	});

	jQuery( "#updateTopicModalSubmit" ).click(function() {

		var meetingseries = jQuery( "#updateTopicModal .id-input" ).val();
		var title = jQuery("#updateTopicModal .title-input").val();
		var description = jQuery("#updateTopicModal .description-textarea").val();

		jQuery.post( "meetingseries/update", { meetingseries: meetingseries, title: title, description: description, timer: timer, url: url } )
			.done( function( data ) {
				console.log( "Updated Topic: " + data );
			});
	});

	jQuery( "#topics-panel .list-group-item" ).dbclick(function() {
		var modal = jQuery( "#updateTopicModal" );
		var topicTitle = jQuery( this ).data( "title" );
		var topicDescription = jQuery( this ).data( "description" );
		
		modal.modal();
		modal.find( "#updateTopicModal .modal-title" ).text( "Updating " + topicTitle );
		modal.find( "#updateTopicModal .title-input" ).val(topicTitle);
		modal.find( "#updateTopicModal .description-textarea").val(topicDescription);
	});

	/* Meeting Modal */

	jQuery(function() {
	    jQuery( "#selected-topics, #all-topics" ).sortable({
	      connectWith: ".topics-list"
	    }).disableSelection();
	  });
  
	jQuery( "#newMeetingModalSubmit" ).click(function() {

		var title = jQuery("#meeting-title-input").val();
		var description = jQuery("#meeting-description-textarea").val();
		var topics = jQuery("#meeting-topics").children(":checked");
		var startTime = jQuery("meeting-date-input").val();
		var timer = jQuery("meeting-timer-input").val();
		var url = jQuery("meeting-url-input").val();

		jQuery.post( "meeting/create", { title: title, description: description, topics: topics, startTime: startTime, timer: timer, url: url } )
			.done( function( data ) {
				console.log( "Created Meeting: " + data );
			});
	});

	/* Meetingseries Modal */
	

});