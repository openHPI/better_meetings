jQuery( document ).ready(function() {

	/* Meetingseries Information */

	jQuery('.meetingseries-information-descritpion').editable('/meetingseries/updateDescription', {
		name		: 'description',
		indicator	: 'Saving...',
        tooltip  	: 'Click to edit...'
    });

	jQuery('.meetingseries-information-timer').editable('/meetingseries/updateTimer', {
		name		: 'timer',
		indicator 	: 'Saving...',
        tooltip   	: 'Click to edit...'
    });

    jQuery('#createPersonModal').on('show.bs.modal', function (event) {
    	console.log('test');
		var button = $(event.relatedTarget); // Button that triggered the modal
		var person = button.data('person'); // Extract info from data-* attributes
		var modal = $(this);
		modal.find('.modal-title').text('Create new ' + person);
		modal.find('#person-type').text(person);
	});

	/* Topics */

	jQuery("#createTopicModal").on('show.bs.modal', function () {
            alert('The modal is about to be shown.');
    });

	jQuery( "#topics-panel .delete-button" ).click( function() {
		var id = parseInt(jQuery(this).attr('data-id'));
		jQuery.post('/topic/delete', id, function() {
  			alert( "success" );
		}).done(function() {
		    alert( "second success" );
		}).fail(function() {
		    alert( "error" );
		}).always(function() {
		    alert( "finished" );
		});
	});

	jQuery('#create-subitem-button').click(function () {
		var text = jQuery('#create-subitem-input').val();
		jQuery('#create-subitem-input').val('');
		var count = jQuery('.subitem-container').attr('data-count');
		jQuery('.subitem-container').attr('data-count', parseInt(count) + 1);
		jQuery('.subitem-container').append('<input type="text" class="form-control" name="subagendaitem' + count + '" value="' + text + '"/>');
	});

	/* Meetings */

	jQuery( '.download-summary-button' ).click(function () {
		var meetingId = jQuery(this).attr('data-id');
		jQuery.get('/meeting/summary/' + meetingId);
	});
	
	/* Meeting Modal */

	jQuery(function() {
	    jQuery( "#selected-topics, #all-topics" ).sortable({
	      connectWith: ".topics-list"
	    }).disableSelection();
	});

	jQuery( '.start-meeting-button' ).click( function () {
		var meetingId = jQuery(this).attr('data-id');
		jQuery.get('/meeting/start/' + meetingId);
	});
	
	

});