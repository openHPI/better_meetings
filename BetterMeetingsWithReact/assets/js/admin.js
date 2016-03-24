jQuery( document ).ready(function() {

	console.log('test');

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

	jQuery( '.start-meeting-button' ).click( function () {
		var meetingId = jQuery(this).attr('data-id');
		var admin = jQuery(this).attr('data-user');
		jQuery.post('/meeting/start/' + meetingId);
	});

	/* Meetingseries Topics */

	jQuery( "#topics-panel .delete-button" ).click( function() {
		console.log('test');
	});

	jQuery('#topics-panel .information-button').click(function() {
		console.log('test');
	});

	jQuery('#topics-panel .comment-button').click(function() {
		console.log('test');
		jQuery(this).parent().next().css( 'display: block' );
	});

	jQuery('#create-subitem-button').click(function () {
		// todo: add subitem
	});
	
	

});