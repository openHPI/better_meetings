jQuery( document ).ready(function() {

	/* Meetingseries Information */

	jQuery('.meetingseries-information-descritpion').editable('/meetingseries/update/description', {
		indicator : 'Saving...',
        tooltip   : 'Click to edit...'
    });

	jQuery('.meetingseries-information-timer').editable('/meetingseries/update/timer', {
		indicator : 'Saving...',
        tooltip   : 'Click to edit...'
    });

    /* Meetingseries Person */

    jQuery('#createPersonModal').on('show.bs.modal', function (event) {
    	console.log('test');
		var button = $(event.relatedTarget); // Button that triggered the modal
		var person = button.data('person'); // Extract info from data-* attributes
		var modal = $(this);
		modal.find('.modal-title').text('Create new ' + person);
		modal.find('#person-type').placeholder = person;
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